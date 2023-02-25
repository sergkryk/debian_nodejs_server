const pool = require("./utils/db");

async function fetchAllMonthly() {
  const response = pool.execute(
    `SELECT id FROM tarif_plans WHERE month_fee > 0`
  );
  if (response && response.length > 0) {
    const data = response[0];
    return data;
  }
}

module.exports = { fetchAllMonthly };
