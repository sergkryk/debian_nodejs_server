const pool = require('./db');

async function dbQuery(query, cb) {
  const [[ res ]] = await pool.execute(query);
  if (cb) {
    return cb(res);
  }
  return res;
}

module.exports = { dbQuery }