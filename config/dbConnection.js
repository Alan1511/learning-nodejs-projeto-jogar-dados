var mysql = require('mysql');

var mysqlConnection = function(){
    return mysql.createConnection({
        host: 'acad01.lages.ifsc.edu.br',
        port: '3306',
        user: 'aluno3',
        password: 'aluno',
        database: 'aluno3'
    });
}

module.exports.connection = mysqlConnection();