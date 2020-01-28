
'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

//LISTANDO CLIENTES
exports.get = async() => {

    var res = await Customer
    .find({});
    return res;
}

//CRIANDO CLIENTES
exports.create = async(data) => {
    //AQUI GERAMOS UMA INSTÂNCIA DO MODEL E JUNTO RECEBEMOS OS DADOS DA NOSSA REQUSIÇÃO E GRAVAMOS NO BANCO DE FORMA ASSINCRONA
     var customer = new Customer(data);
     await customer.save();
}

//AQUI ESTAMOS USANDO O REPOSITORY PARA TRAZER UM NOVO TOKEN DE USUÁRIO
exports.authenticate = async(data) => {

    var res = await Customer
    .findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.getById = async(id) => {

    var res = await Customer
    .findById(id);
    return res;
}


