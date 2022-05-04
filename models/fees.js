const pool = require('../utils/db');

const getLastById = async function (id) {
  const [[last]] = await pool.execute(`SELECT date, sum, dsc, method FROM fees WHERE uid = ${id} ORDER BY date DESC LIMIT 1;`);
  return last;
}

const getAllById = async function (id) {
    const [all] = await pool.execute(`SELECT date, sum, dsc, method FROM fees WHERE uid = ${id} ORDER BY date DESC`);
    return all;
}

module.exports = 
{
  getLastById,
  getAllById,
};