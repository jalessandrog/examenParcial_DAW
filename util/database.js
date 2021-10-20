const mysql = require('mysql2');

let database_name = "a01701434";

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: database_name,
    password: ''
});

module.exports = pool.promise();