const pool = require("../utils/db");

async function isUnique(id) {
  const [[data]] = await pool.execute(
    `SELECT id FROM payments WHERE ext_id = '${id}'`
  );
  if (data) {
    return false;
  }
  return true;
}

module.exports = isUnique;
