
'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

//GET ASSINCRONO LISTA BANCO PEDIDOS ASSINCRONO
exports.get = async() => {

    var res = await Order
    .find({}, 'number status')
    .populate('customer', 'name')//AQUI ESTAMOS PASSANDO O QUE QUEREMOS QUE CHEGUE BO FILTRO DO GET
    .populate('itens.product', 'title');
    return res;
}

//CREATE ORDER BANCO PEDIDOS ASSINCRONO
exports.create = async(data) => {
    //AQUI GERAMOS UMA INSTÂNCIA DO MODEL E JUNTO RECEBEMOS OS DADOS DA NOSSA REQUSIÇÃO E GRAVAMOS NO BANCO DE FORMA ASSINCRONA
     var order = new Order(data);
     await order.save();
}
 