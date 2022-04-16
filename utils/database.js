const mysql = require('mysql2');

const host = '192.168.88.100';
const user = 'node';
const database = 'abills';
const password = 'Cnbdtyvjhufy64&$'

const pool = mysql.createPool({
  host,
  user,
  database,
  password
});

module.exports = pool.promise();
