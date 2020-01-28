'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//AQUI ESTAMOS GERANDO NOSSA SCHEMA QUE IRÁ GERAR ESSA COLLECTION NO NOSSO BANCO DE DADOS
//LEMBRANDO QUE O NODEJS TRABALHA COM DOCUMENTOS
const schema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,//AQUI ESTAMOS REFERENCIANDO NOSSO MODEL CUSTOMERS
        ref: 'Customer'
    },
    number: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default:Date.now
    },
    status: {
        type: String,
        required: true,
        enum:['created', 'done'],
        default:'created'
    },
    itens:[{

        quantity:{
            type: Number,
            require: true,
            default: 1
        },
        price:{
            type: Number,
            require: true,
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'   //AQUI ESTAMOS REFERENCIANDO NOSSO MODEL PRODUCT
        }
    }]
});

module.exports = mongoose.model('Order', schema)