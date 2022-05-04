const mysql = require('mysql2');
const databaseConfig = require('../config/db')


const pool = mysql.createPool(databaseConfig);

module.exports = pool.promise();
