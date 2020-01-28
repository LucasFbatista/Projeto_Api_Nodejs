'use strict';

//AQUI ESTAMOS IMPORTANDO NOSSO CONTROLLER
const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');


//AQUI ESTAMOS CHAMANDO NOSSO CONTROLLER GET
router.get('/', controller.get);

//AQUI ESTAMOS CHAMANDO NOSSO CONTROLLER GET
router.get('/admin/:id', authService.authorize, controller.getById);

//AQUI ESTAMOS CHAMANDO NOSSO CONTROLLER GET
router.get('/:slug', controller.getBySlug);

//AQUI ESTAMOS CHAMANDO NOSSO CONTROLLER GET TAG
router.get('/tags/:tag', controller.getByTag);

//AQUI ESTAMOS CHAMANDO NOSSO CONTROLLER POST
router.post('/', authService.isAdmin, controller.post);//O AUTH SERVICE SERVE COMO MIDDLEWARE QUE ONDE IRÁ VERIFICAR SE O USUÁRIO QUE ESTA
                                                        //FAZENDO A REQUISIÇÃO POSSUE DETERMINANDA PERMISSÃO
//AQUI ESTAMOS CHAMANDO NOSSO CONTROLLER PUT
router.put('/:id', authService.isAdmin, controller.put);

//AQUI ESTAMOS CHAMANDO NOSSO CONTROLLER DELETE
router.delete('/:id', authService.isAdmin, controller.delete);

module.exports = router;