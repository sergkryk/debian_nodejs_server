const pool = require("../utils/db");

async function updateBill(uid, amount) {
  const updateBillResponse = await pool.execute(
    `UPDATE bills SET deposit = deposit + ${parseFloat(
      amount
    )} where uid = ${uid}`
  );
  if (updateBillResponse.length > 0) {
    return true;
  }
  return false;
}

module.exports = updateBill;
