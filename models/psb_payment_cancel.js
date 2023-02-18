const pool = require("../utils/db");

async function cancelPay(transactionId) {
  const response = await pool.execute(`DELETE FROM payments WHERE ext_id = ${transactionId}`);
  if (response.length > 0) {
    return response;
  }
  throw new Error("Something went wrong while payment cancel!");
}

module.exports = cancelPay;
