const pool = require("../utils/db");

async function fetchUid(id) {
  const [[ data ]] = await pool.execute(
    `SELECT uid FROM users WHERE id = 'user_${id}'`
  );
  if (data) {
    return data;
  } else {
    return "";
  }
}

module.exports = fetchUid;
