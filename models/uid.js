const pool = require("../utils/db");

async function getStatus(id) {
  try {
    const [[res]] = await pool.execute(
      `SELECT id, uid, disable FROM users WHERE id = 'user_${id}'`
    );
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = getStatus;
