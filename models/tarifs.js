const dbQuery = require("../utils/database");

async function fetchAllMonthly() {
  const data = await dbQuery(`SELECT id FROM tarif_plans WHERE month_fee > 0`);
  return data;
}

async function fetchById(id) {
  const data = await dbQuery(`SELECT * FROM tarif_plans WHERE id = ${id}`);
  return data;
}

async function fetchByUid(uid) {
  const data = await dbQuery(`SELECT * FROM dv_main WHERE uid = ${uid}`);
  return data;
}

async function fetchUsersByTarif(id) {
  const data = await dbQuery(`SELECT uid FROM dv_main WHERE tp_id = ${id}`);
  return data;
}

module.exports = { fetchAllMonthly, fetchById, fetchUsersByTarif, fetchByUid };
