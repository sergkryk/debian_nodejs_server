const pool = require("../utils/db");

const fetchName = async function (userId) {
  const [[data]] = await pool.execute(
    `SELECT fio FROM users_pi WHERE uid = ${userId}`
  );
  if (data) {
    return data;
  } else {
    return "";
  }
};

module.exports = fetchName;
