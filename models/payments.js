const pool = require('../utils/db');

const fetchLastUserPayments = async function (id) {
  const [[last]] = await pool.execute(`SELECT date, sum, last_deposit, method, inner_describe FROM payments WHERE uid = ${id} ORDER BY date DESC LIMIT 1;`);
  return last;
}

const fetchAllUserPayments = async function (id) {
    const [all] = await pool.execute(`SELECT date, sum, last_deposit, method, inner_describe FROM payments WHERE uid = ${id} ORDER BY date DESC`);
    return all;
}

module.exports = 
{
  fetchLastUserPayments,
  fetchAllUserPayments,
};