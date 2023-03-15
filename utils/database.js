const mysql = require('mysql2');

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
};

const pool = mysql.createPool(config);

async function dbQuery(queryString) {
  const poolPromise = pool.promise();
  const [rows, fields] = await poolPromise.execute(queryString);
  if (rows.length === 1) {
    return rows[0];
  }
  return rows;
}

module.exports = dbQuery;
