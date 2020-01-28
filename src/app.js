'use strict';

//ARQUIVO QUE CONTÉM A CONFIGURAÇÃO DAS NOSSAS ROTAS
const express = require('express');
//SERVER PARA CONVERTE NOSSO CONTEÚDO DO CORPO DA REQUISIÇÃO EM JSON
const bodyParser = require('body-parser');

//AQUI ESTAMOS USANDO NOSSA STRING DE CONEXÃO DO ARQUIVO CONFIG.JS
const config = require('./config');

//AQUI ESTAMOS IMPORTANDO NOSSO MONGOOSE QUE IRÁ CONECTAR NO NOSSO BANCO
const mongoose = require('mongoose');

//FAZENDO CONEXÃO COM O BANCO
mongoose.connect(config.connectionString);

//AQUI ESTAMOS DEFININDO NOSSA CONST PARA APP E ROUTER
const app = express();
const router = express.Router();

//CARREGAR MODELS
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/Order');

//CARREGAR ROTAS
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

//AQUI ESTAMOS DIZENDO PARA NOSSA APLICAÇÃO USAR O BODYPARSE TODA REQUISIÇÃO PASSARA POR AQUI
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//URL E VERBOS
app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

//AQUI ESTAMOS EXPORTANDO QUALQUER COISA QUE ESTEJA NESSA CLASSE
module.exports = app;
