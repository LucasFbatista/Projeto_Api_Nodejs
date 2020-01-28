'use strict';

//AQUI ESTAMOS IMPORTANDO NOSSO CONTROLLER
const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');



router.get('/', controller.get);

//AQUI ESTAMOS CHAMANDO NOSSO CONTROLLER POST
router.post('/', controller.post);

//ROTA DE AUTENTICAÇÃO DE CUSTOMERS
router.post('/authenticate', controller.authenticate);


//ROTA DE REFRESH TOKEN
router.post('/refresh-token', authService.authorize, controller.refreshToken);


module.exports = router;