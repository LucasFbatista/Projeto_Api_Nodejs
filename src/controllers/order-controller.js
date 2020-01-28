'use strict';

const mongoose = require('mongoose');
const guid = require('guid');
const authService = require('../services/auth-service');
const repository = require('../repositories/order-repository');


//LIST ORDER ASSINCRONO
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

//AQUI SERÁ CRIADO UMA ORDEM CONTENTO NUMERO DA SOLICITAÇÃO CLIENTE E OS INTENS
exports.post = async(req, res, next) => {

      //RECEBEMOS O TOKEN DO CORPO DA REQUISIÇÃO DESCODIFICAMOS ASSIM FAZEMOS A VERIFICAÇÃO DAMOS CONTINUIDADE NA CRIAÇÃO DO PEDIDO
      const token = req.body.token || req.query.token || req.headers['x-access-token'];
      const data = await authService.decodeToken(token);

    //AQUI ESTAMOS VERIFICANDO SE O PRODUTO FOI SALVO NO BANCO DE FORMA ASSINCRONA CASO CONTRÁRIO SERÁ RETORNANDO UM ERRO
    try {
        await repository.create({

            customer:data.id,
            number:guid.raw().substring(0, 6),//AQUI IREMOS GERAR UM GUID E PEGAR O 6 PRIMEIROS CARACTERES PARA GERAR NUMERO DO PEDIDO
            itens:req.body.itens
        });
        res.status(201).send({
            message: 'Pedido Cadastrado com Sucesso!'
        });
    } catch (e) {
        res.status(500).send({

            message: 'Falha na requisição do pedido, Tente Novamente!'
        });
    } 
};
