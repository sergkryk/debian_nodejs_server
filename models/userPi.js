const pool = require("../utils/db");
const { processResponse } = require("../utils/dbValidation");

async function fetchByUid(uid) {
  const response = await pool.execute(`SELECT * FROM users_pi WHERE uid = ${uid}`);
  const data = processResponse(response);
  return data;
}

module.exports = { fetchByUid };
