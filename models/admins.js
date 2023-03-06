const pool = require("../utils/db");
const { processResponse } = require("../utils/dbValidation");

async function fetchById(id) {
  const response = await pool.execute(`SELECT id, aid, name, disable, password, CONVERT(DECODE(password, '${process.env.DB_SECRET}') USING utf8) as password FROM admins WHERE id = '${id}'`);
  const data = processResponse(response);
  return data;
}

module.exports = { fetchById };
