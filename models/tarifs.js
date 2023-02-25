const pool = require("../utils/db");

async function fetchAllMonthly() {
  const response = await pool.execute(
    `SELECT id FROM tarif_plans WHERE month_fee > 0`
  );
  if (response && response.length > 0) {
    const data = response[0];
    return data;
  }
}

async function fetchById(id) {
  const response = await pool.execute(
    `SELECT * FROM tarif_plans WHERE id = ${id}`
  );
  if (response && response.length > 0) {
    const data = response[0];
    return data;
  }
}

async function fetchUsersByTarif(id) {
  const response = await pool.execute(
    `SELECT uid FROM dv_main WHERE tp_id = ${id}`
  );
  if (response && response.length > 0) {
    const data = response[0];
    return data;
  }
}

module.exports = { fetchAllMonthly, fetchById, fetchUsersByTarif };
