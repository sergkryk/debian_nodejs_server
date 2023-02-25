const pool = require("../utils/db");

async function fetchPhone(uid) {
  const response = await pool.execute(
    `SELECT phone FROM users_pi WHERE uid = ${uid}`
  );
  if (response && response.length > 0) {
    const data = response[0];
    return data;
  }
}

module.exports = { fetchPhone };
