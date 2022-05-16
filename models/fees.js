const pool = require('../utils/db');

const fetchAllFees = async function(orderby = 'DESC', rows = 25) {
  const [ fee ] = await pool.execute(`SELECT * FROM fees ORDER BY date ${orderby} LIMIT ${rows}`);
  return fee;
}
const fetchUserFees = async function(userId, orderby = 'DESC', rows = 25) {
  // const [ fee ] = await pool.execute(`SELECT date, sum, dsc, method FROM fees WHERE uid = ${userId} ORDER BY date ${orderby} LIMIT ${rows}`);
  const [ fee ] = await pool.execute(`SELECT id, date, sum, dsc, method FROM fees WHERE id = (SELECT max(id) as id FROM fees WHERE uid = ${userId})`); // более быстрый вариант запроса к базе
  return fee;
}


module.exports = {
  fetchAllFees,
  fetchUserFees,
};