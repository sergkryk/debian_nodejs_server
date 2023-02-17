const pool = require("../utils/db");

async function fetchTransaction(id) {
  try {
    const [ res ] = await pool.execute(
      `SELECT id FROM payments WHERE ext_id = '${id}'`
    );
    if (res.length === 0) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = fetchTransaction;
