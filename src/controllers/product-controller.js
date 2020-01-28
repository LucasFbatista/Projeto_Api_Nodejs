'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');


//LIST PRODUTOS ASSINCRONO
exports.get = async(req, res, next) => {

    //AQUI ESTAMOS PASSANDO NOSSA CAMANDA REPOSITORY METODO LIST E TRAZENDO OS DADOS TRABALHANDO DE FORMA ASSINCRONA
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição!'
        });
    }
};

//GET SLUG PRODUTOS ASSINCRONA
exports.getBySlug = async(req, res, next) => {

    //AQUI ESTAMOS PASSANDO NOSSA CAMANDA REPOSITORY METODO GETBYSLUG E TRAZENDO OS PRODUTOS VIA SLUG ASSINCRONO  
    try {
        var data = await repository
        .getBySlug(req.params.slug);
        //STATUS DE SUCESSO
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({

            message: 'Falha ao processar requisição!'
        });
    }

};

//GET ID PRODUTOS CASO PRECISE USAR GET ID EXEMPLO ASSINCRONO:
exports.getById = async(req, res, next) => {

    //AQUI ESTAMOS PASSANDO NOSSA CAMADA REPOSITORY METODO GETBYID E RETORNANDO UM PRODUTO PELO ID
    try {
        var data = await repository.getById(req.params.id);
         //STATUS DE SUCESSO
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({

            message: 'Falha ao processar requisição!'
        });
    }
};

//GET TAG PRODUTOS ASSINCRONO
exports.getByTag = async(req, res, next) => {

    //AQUI ESTAMOS PASSANDO NOSSA CAMADA REPOSITORY METODO GETBYTAG E RETORNANDO UM PRODUTO PELA TAG DE FORMA ASSINCRONA
    
    try {
        var data = await repository.getByTag(req.params.tag);
         //STATUS DE SUCESSO
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({

            message: 'Falha ao processar requisição!'
        });
    }
};

//CRIAR PRODUTO ASSINCRONO
exports.post = async(req, res, next) => {

    //AQUI IREMOS VALIDAR NOSSOS INPUTS E O QUE VIER NA REQUISIÇÃO COM ValidationContract
    let contract = new ValidationContract();

    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O Slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    //SE OS DADOS FOREM ERRADOS ELE RETORNA UM BAD REQUEST
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    //AQUI ESTAMOS VERIFICANDO SE O PRODUTO FOI SALVO NO BANCO DE FORMA ASSINCRONA CASO CONTRÁRIO SERÁ RETORNANDO UM ERRO
    try {
        await repository.create(req.body)
        res.status(201).send({
            message: 'Produto Cadastrado com Sucesso!'
        });
    } catch (e) {
        res.status(500).send({

            message: 'Falha ao Cadastradar Produto, Tente Novamente!'
        });
    } 
};

//CRIAR PRODUTO DE FORMA ASSINCRONO
exports.put = async(req, res, next) => {

        //PODEMOS ATUALIZAR UM PRODUTO DESSA FORMA OU USAR O DO EXEMPLO DO POST ACIMA, AQUI USAMOS TAMBÉM DE FORMA ASSINCRONA
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: 'Produto Atualizado com Sucesso!'
        });
    } catch (error) {
          //AQUI RETORNAMOS UM BAD REQUEST
          res.status(400).send({
            message: 'Falha ao Atualizar Produto',
            data: e
        });
    }
};

//DELETAR PRODUTO ASSINCRONO
exports.delete = async(req, res, next) => {

    try {
        await  repository.delete(req.params.id)
        res.status(200).send({
            message: 'Produto Removido com Sucesso!'
        });
    } catch (error) {
        //AQUI RETORNAMOS UM BAD REQUEST
        res.status(400).send({
            message: 'Falha ao Remover Produto',
            data: e
        });
    }
}