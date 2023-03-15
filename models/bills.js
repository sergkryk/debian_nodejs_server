const dbQuery = require("../utils/database");

async function fetchByUid(uid) {
  const data = await dbQuery(`SELECT * FROM bills WHERE uid = ${uid}`);
  return data;
}

async function update(uid, sum) {
  const data = await dbQuery(
    `UPDATE bills SET deposit = ${parseFloat(sum)} where uid = ${uid}`
  );
  return data;
}

module.exports = { fetchByUid, update };
