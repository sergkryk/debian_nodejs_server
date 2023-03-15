const dbQuery = require("../utils/database");

async function fetchByUid(uid) {
  const data = await dbQuery(`SELECT * FROM users WHERE uid = ${uid}`);
  return data;
}

async function fetchByLogin(login) {
  const data = await dbQuery(`SELECT * FROM users WHERE id = 'user_${login}'`);
  return data;
}

module.exports = { fetchByUid, fetchByLogin };
