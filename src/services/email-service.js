'use strict'

//ESSA PARTE PRECISA SER IMPLEMENTADA NA CONTROLLER customer-controller

var config = require('../config');
var sendgrid = require('sendgrid')(config.sendgridKey);


exports.send = async (to, subject, body) => {

    sendgrid.send({

        to: to,
        from: 'lucasferreirabatista5@gmail.com',
        subject: subject,
        html: body
    });

}