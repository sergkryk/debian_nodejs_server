const pool = require("../utils/db");
const { processResponse } = require("../utils/dbValidation");

async function fetchByUid(uid) {
  const response = await pool.execute(`SELECT * FROM bills WHERE uid = ${uid}`);
  const data = processResponse(response);
  return data;
}

async function update(uid, sum) {
  const response = await pool.execute(
    `UPDATE bills SET deposit = ${parseFloat(sum)} where uid = ${uid}`
  );
  const data = processResponse(response);
  return data;
}

module.exports = { fetchByUid, update };
