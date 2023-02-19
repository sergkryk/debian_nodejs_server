const pool = require("../utils/db");

async function fetchDisable(id) {
  const [[data]] = await pool.execute(
    `SELECT disable FROM users WHERE uid = '${id}'`
  );
  if (data) {
    return data.disable;
  } else {
    return "";
  }
}

module.exports = fetchDisable;
