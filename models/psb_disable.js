const pool = require("../utils/db");

async function fetchDisable(id) {
  const [[res]] = await pool.execute(
    `SELECT disable FROM users WHERE uid = '${id}'`
  );
  return res.disable;
}

module.exports = fetchDisable;
