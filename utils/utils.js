const pool = require('./db');

async function dbQuery(field, query) {
  const [[ res ]] = await pool.execute(query);
  if (typeof(res) === 'object' && res.hasOwnProperty(field)) {
    return res[field]
  } else {
    return ''
  }
}

module.exports = { dbQuery }