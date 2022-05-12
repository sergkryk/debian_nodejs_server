const pool = require('../utils/db');

const fetchUserDetails = async function(userId) {
  const [ user ] = await pool.execute(`SELECT u.uid, u.id as login, u.password, 
  CONVERT(DECODE(u.password, 'abills345678901234490137') USING utf8) as password, 
  b.deposit, u.reduction, d.cid, d.tp_id 
  FROM users u 
  INNER JOIN dv_main d ON d.uid = u.uid 
  INNER JOIN bills b ON d.uid = b.uid 
  WHERE u.uid = ${userId}`);
  return user;
}

module.exports = { fetchUserDetails };