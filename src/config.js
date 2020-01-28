//AQUI ESTAMOS CRIANDO VARIAVEIS GLOBAIS PARA TER ACESSO EM QUALQUER LUGAR DA NOSSA APLICAÇÃO
//UMA PARA HASH DE SENHA E AUTENTICAÇÃO E OUTRA PARA ENVIOU DE EMAILS UM EXEMPLO TEMPLATE
global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo à Node Store!';

//AQUI ESTAMOS CRIANDO NOSSA CONECTSTRING DO BANCO DE DADOS
module.exports = {
    //STRING CONEXÃO COM BANCO
    connectionString: 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false',
    //API KEY PARA ENVIOU DE EMAIL
    sendgridKey: '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',
    //STRING DE AUTENTICAÇÃO
    containerConnectionString: 'SUA CONNECTION STRING'
}