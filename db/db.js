const mysql = require('mysql2');

const abills = {
  host: '192.168.88.100',
  user: 'node',
  database: 'abills',
  password: 'Cnbdtyvjhufy64&$',
}

const pool = mysql.createPool(abills);
const promisePool = pool.promise();

module.exports = promisePool;
