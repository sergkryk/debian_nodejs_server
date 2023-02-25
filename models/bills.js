const pool = require("../utils/db");

// async function fetchAllMonthly() {
//   const response = await pool.execute(
//     `SELECT id FROM tarif_plans WHERE month_fee > 0`
//   );
//   if (response && response.length > 0) {
//     const data = response[0];
//     return data;
//   }
// }

async function fetchByUid(uid) {
  const response = await pool.execute(
    `SELECT * FROM bills WHERE uid = ${uid}`
  );
  if (response && response.length > 0) {
    const data = response[0];
    return data;
  }
}

// async function fetchUsersByPlan(id) {
//   const response = await pool.execute(
//     `SELECT uid FROM dv_main WHERE tp_id = ${id}`
//   );
//   if (response && response.length > 0) {
//     const data = response[0];
//     return data;
//   }
// }

module.exports = { fetchByUid };
