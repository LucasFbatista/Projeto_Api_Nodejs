//NOSSA CAMADA REPOSITORY SERÁ REPONSÁVEL POR ACESSAR NOSSO BANCO E TRAZER
//AS INFORMAÇÕES NECESSÁRIAS PARA O CONTROLLER ASSIM TIRAMOS TODAS A RESPONSSABILIDADE DO NOSSO CONTROLLER

'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

//GET ASSINCRONO LISTA BANCO PRODUCT ASSINCRONO
exports.get = async() => {

    const res = await Product
    .find({
        active:true
    }, 'title slug price');
    return res;
}

//GET ASSINCRONO SLUG BANCO PRODUCT
exports.getBySlug = async(slug) => {

    const res = await Product
    .findOne({
        active: true,
        slug: slug,
    }, 'title slug  price description tags');
    return res;
}

//GET ID BANCO PRODUCT ASSINCRONO
exports.getById = async(id) => {
    
    const res = await Product.findById(id);
    return res;
}

//GET TAG BANCO PRODUCT ASSINCRONO
exports.getByTag = async(tag) => {

    const res = await Product
    .find({
        tags: tag,
        active: true
    }, 'title slug  price description tags');
    return res;
}

//CREATE PRODUTO BANCO
exports.create = async(data) => {
   //AQUI GERAMOS UMA INSTÂNCIA DO MODEL E JUNTO RECEBEMOS OS DADOS DA NOSSA REQUSIÇÃO E GRAVAMOS NO BANCO DE FORMA ASSINCRONA
    var product = new Product(data);
    await product.save();
}

//UPDATE PRODUTO BANCO ASSINCRONO
exports.update = async(id, data) => {

   await Product
    .findByIdAndUpdate(id, {

        $set:{

            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
        
    })
}

//DELETE PRODUTO BANCO ASSINCRONO
exports.delete = async(id) => {

    await Product
    .findByIdAndRemove(id)
}







