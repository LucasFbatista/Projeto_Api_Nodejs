'use strict'; 

const md5 = require('md5');
const global = require('../config');
const mongoose = require('mongoose');
const authService = require('../services/auth-service');
// const emailService = require('../services/email-service');
const repository = require('../repositories/custormer-repository');
const ValidationContract = require('../validators/fluent-validator');



//LIST CUSTOMERS ASSINCRONO
exports.get = async(req, res, next) => {

    //AQUI ESTAMOS PASSANDO NOSSA CAMANDA REPOSITORY METODO LIST E TRAZENDO OS DADOS TRABALHANDO DE FORMA ASSINCRONA
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao Cadastrar Cliente requisição!'
        });
    }
};

//AQUI SERÁ CRIADO UM NOVO CLIENTE
exports.post = async(req, res, next) => {

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.name, 3, 'O campo Nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 256, 'Campo E-mail obrigatório' );
    contract.hasMinLen(req.body.password, 8, 'O campo Senha deve conter pelo menos 8 caracteres');

    //SE OS DADOS FOREM ERRADOS ELE RETORNA UM BAD REQUEST
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    //AQUI ESTAMOS CRIANDO UM NOVO USUÁRIO PASSANDO A RESPONSABILIDADE PARA O NOSSO REPOSITORIO
    try {
        await repository.create({

            name:req.body.name,
            email:req.body.email,//AQUI IREMOS GERAR UM GUID E PEGAR O 6 PRIMEIROS CARACTERES
            password:md5(req.body.password + global.SALT_KEY),
            roles:req.body.roles
        });

        //AQUI IREMOS ENVIAR UM EMAIL AO USUÁRIO CRIADO DE BOAS VINDAS
        //PARTE EM TESTE AINDA
        // emailService.send(req.body.email, 'Bem Vindo Ao Node Store', global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(201).send({
            message: 'Cliente Cadastrado com Sucesso!'
        });
    } catch (e) {
        res.status(500).send({

            message: 'Falha ao Cadastrar Cliente , Tente Novamente!'
        });
    } 
};


//METODO DE AUTENTICAÇÃO DE CUSTOMERS
exports.authenticate = async(req, res, next) => {
    try {
        //RECEBEMOS O EMAIL E SENHA E PASSSAMOS PELOS METODO AUTHENTICATED NO REPOSITORY
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        //VERIFICAMOS SE OS DADOS DO CUSTOMERS NO BANCO É VALIDO
        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        //SE SIM PEGAMOS OS DADOS DESSE CUSTOMERS E GERAMOS NOSSO TOKEN
        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
        //CASO NÃO VALIDO É LANÇADO UMA EXCESSÃO
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};
//METODO DE ATUALIZAÇÃO DE TOKEN
exports.refreshToken = async(req, res, next) => {
    try {
        //RECEBEMOS O TOKEN DO CORPO DA REQUISIÇÃO DESCODIFICAMOS
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);


        //PROCURAMOS O CUSTOMERS PELO ID
        const customer = await repository.getById(data.id);

        if (!customer) {
            res.status(404).send({
                message: 'Cliente não encontrado'
            });
            return;
        }

        //GERAMOS UM NOVO TOKEN PARA ESSE CUSTOMERS
        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        //ENVIAMOS DE VOLTA PARA O NOSSO CUSTOMER
        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};