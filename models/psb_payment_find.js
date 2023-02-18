const pool = require("../utils/db");

async function findPay(uid, transactionId, amount) {
  const response = await pool.execute(`SELECT id FROM payments WHERE ext_id = ${transactionId} AND uid = ${uid} AND sum = ${amount}`);
  if (response.length > 0) {
    const responseBody = response[0];
    if (responseBody.length > 0) {
      const { id } = responseBody[0];
      return id;
    }
    return '';
  }
  throw new Error("Something went wrong while payment cancel!");
}

module.exports = findPay;
