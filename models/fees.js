const pool = require('../utils/db');

const fetchLastUserFees = async function (id) {
  const [[last]] = await pool.execute(`SELECT date, sum FROM fees WHERE uid = ${id} ORDER BY date DESC LIMIT 1;`);
  console.log(last);
  return last;
}

const fetchAllUserFees = async function (id) {
    const [all] = await pool.execute(`SELECT date, sum FROM fees WHERE uid = ${id} ORDER BY date DESC`);
    return all;
}

module.exports = 
{
  fetchLastUserFees,
  fetchAllUserFees,
};