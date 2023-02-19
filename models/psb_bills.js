const pool = require("../utils/db");

function checkResponse(response) {
  const result = response.changedRows === 1 ? true : false;
  return result;
}

async function add(uid, amount) {
  const response = await pool.execute(
    `UPDATE bills SET deposit = deposit + ${parseFloat(
      amount
    )} where uid = ${uid}`
  );
  if (response.length > 0) {
    return checkResponse(response[0]);
  } else {
    return false;
  }
}

async function substract(uid, amount) {
  const response = await pool.execute(
    `UPDATE bills SET deposit = deposit - ${parseFloat(
      amount
    )} where uid = ${uid}`
  );
  if (response.length > 0) {
    return checkResponse(response[0]);
  } else {
    return false;
  }
}

module.exports = { add, substract };
