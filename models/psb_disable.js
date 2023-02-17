const pool = require("../utils/db");

async function fetchDisable(id) {
  try {
    const [[res]] = await pool.execute(
      `SELECT disable FROM users WHERE uid = '${id}'`
    );
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = fetchDisable;
