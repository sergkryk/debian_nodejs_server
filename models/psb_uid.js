const pool = require("../utils/db");

async function fetchUid(id) {
  try {
    const [[res]] = await pool.execute(
      `SELECT uid FROM users WHERE id = 'user_${id}'`
    );
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = fetchUid;
