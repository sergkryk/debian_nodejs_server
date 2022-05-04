// const pool = require('../utils/db');

// const getInfo = async function (id) {
//   const [[ res ]] = await pool.execute(`SELECT uid FROM users WHERE uid = ${id}`);
//   if (typeof(res) === 'object') {
//     const user = {};
//     const [[ usersKeys ]] = await pool.execute(`SELECT uid, id as login, password, reduction, CONVERT(DECODE(password, 'abills345678901234490137') USING utf8) as password FROM users WHERE uid = ${id}`);
//     const [[ dvmainKeys ]] = await pool.execute(`SELECT cid, tp_id FROM dv_main WHERE uid = ${id}`);
//     const [[ tarifPlansKeys ]] = await pool.execute(`SELECT name as tariff, day_fee, month_fee FROM tarif_plans WHERE id = ${dvmainKeys.tp_id}`);
//     const [[ billsKeys ]] = await pool.execute(`SELECT deposit FROM bills WHERE uid = ${id}`);
//     Object.assign(user, usersKeys, dvmainKeys, tarifPlansKeys, billsKeys);
//     user.expire = calcExpireDate(user);
//     return user;
//   }
//   return 'Not found';
// };

// module.exports = 
// {
//   getInfo,
// };