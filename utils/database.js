const mysql = require('mysql2');

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  keepAliveInitialDelay: 10000, // 0 by default.
  enableKeepAlive: true, // false by default.
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


// функция для проверки ошибки ECONNRESET, вдруг будет нужна
// async function query_with_retries(sql, params, retries_left=1) {
//   try {
//     return pool.query(sql, params)
//   } catch(err) {
//     if(retries_left >= 1 && err.code === 'ECONNRESET') {
//       console.error({msg:'query_with_retries retrying!', retries_left, err})
//       return query_with_retries(sql, params, retries_left-1)
//     } else {
//       throw err
//     }
//   }
// }

module.exports = dbQuery;
