const dbQuery = require("../utils/database");

async function fetchById(id) {
  const data = await dbQuery(
    `SELECT id, aid, name, disable, password, CONVERT(DECODE(password, '${process.env.DB_SECRET}') USING utf8) as password FROM admins WHERE id = '${id}'`
  );
  return data;
}

module.exports = { fetchById };
