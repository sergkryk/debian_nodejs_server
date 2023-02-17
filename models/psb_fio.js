const pool = require("../utils/db");

const fetchName = async function (userId) {
  const [[fio]] = await pool.execute(
    `SELECT fio FROM users_pi WHERE uid = ${userId}`
  );
  return fio;
};

module.exports = fetchName;
