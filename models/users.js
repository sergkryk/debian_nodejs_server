const dbQuery = require("../utils/database");

async function fetchByUid(uid) {
  const data = await dbQuery(`SELECT * FROM users WHERE uid = ${uid}`);
  return data;
}

async function fetchByLogin(login) {
  const data = await dbQuery(`SELECT * FROM users WHERE id = 'user_${login}'`);
  return data;
}

async function fetchPasswordByUid(uid) {
  const data = await dbQuery(
    `SELECT password, CONVERT(DECODE(password, '${process.env.DB_SECRET}') USING utf8) as password FROM users WHERE uid = '${uid}'`
  );
  return data;
}

module.exports = { fetchByUid, fetchByLogin, fetchPasswordByUid };
