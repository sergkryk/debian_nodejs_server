const mysql = require('mysql2');
const databaseConfig = require('../database/dbconfig')


const pool = mysql.createPool(databaseConfig);

module.exports = pool.promise();
