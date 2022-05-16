const pool = require('../utils/db');

const fetchAllPays = async function(orderby = 'DESC', rows = 25) {
  const [ pays ] = await pool.execute(`SELECT * FROM payments ORDER BY date ${orderby} LIMIT ${rows}`);
  return pays;
}
const fetchUserPays = async function(userId, orderby = 'DESC', rows = 25) {
  const [ pays ] = await pool.execute(`SELECT date, sum, dsc, method FROM payments WHERE uid = ${userId} ORDER BY date ${orderby} LIMIT ${rows}`);
  return pays;
}


module.exports = {
  fetchAllPays,
  fetchUserPays,
};