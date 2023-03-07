const pool = require("../utils/db");
const { processResponse } = require("../utils/dbValidation");


async function fetchAllMonthly() {
  const response = await pool.execute(
    `SELECT id FROM tarif_plans WHERE month_fee > 0`
  );
  const data = processResponse(response);
  return data;
}

async function fetchById(id) {
  const response = await pool.execute(
    `SELECT * FROM tarif_plans WHERE id = ${id}`
  );
  const data = processResponse(response);
  return data;
}

async function fetchUsersByTarif(id) {
  const response = await pool.execute(
    `SELECT uid FROM dv_main WHERE tp_id = ${id}`
  );
  const data = processResponse(response);
  return data;
}

module.exports = { fetchAllMonthly, fetchById, fetchUsersByTarif };
