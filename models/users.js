const pool = require("../utils/db");
const { processResponse } = require("../utils/dbValidation");

async function fetchByUid(uid) {
  const response = await pool.execute(`SELECT * FROM users WHERE uid = ${uid}`);
  const data = processResponse(response);
  return data;
}

async function fetchByLogin(login) {
  const response = await pool.execute(`SELECT * FROM users WHERE id = 'user_${login}'`);
  const data = processResponse(response);
  return data;
}

module.exports = { fetchByUid, fetchByLogin };
