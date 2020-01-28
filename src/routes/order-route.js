'use strict';

//AQUI ESTAMOS IMPORTANDO NOSSO CONTROLLER
const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service');


//AQUI ESTAMOS CHAMANDO NOSSO CONTROLLER POST
router.post('/', authService.authorize,  controller.post);

//AQUI ESTAMOS CHAMANDO NOSSO CONTROLLER GET
router.get('/', authService.authorize, controller.get);

module.exports = router;