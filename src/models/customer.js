'use strict';

//AQUI ESTAMOS GERANDO NOSSA SCHEMA QUE IRÁ GERAR ESSA COLLECTION NO NOSSO BANCO DE DADOS
//LEMBRANDO QUE O NODEJS TRABALHA COM DOCUMENTOS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }]
});

module.exports = mongoose.model('Customer', schema);