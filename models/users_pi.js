const dbQuery = require("../utils/database");

async function fetchByUid(uid) {
  const data = await dbQuery(`SELECT * FROM users_pi WHERE uid = ${uid}`);
  return data;
}

module.exports = { fetchByUid };
