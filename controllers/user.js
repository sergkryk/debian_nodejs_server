const promisePool = require('../db/db');

const { calcExpireDate } = require('../utils');

const getUser = async function (id) {
  const user = {};

  function handleResolve([response]) {
    Object.assign(user, response[0])
  }
  function handleReject(err) {
    console.log('Error happens', err);
  }

  await promisePool.execute(`SELECT id as login, password, reduction, disable as isExpired, CONVERT(DECODE(password, 'abills345678901234490137') USING utf8) FROM users WHERE uid = ${id}`).then(handleResolve, handleReject);
  await promisePool.execute(`SELECT cid, tp_id FROM dv_main WHERE uid = ${id}`).then(handleResolve, handleReject);
  await promisePool.execute(`SELECT name as tariff, day_fee, month_fee FROM tarif_plans WHERE id = ${user.tp_id}`).then(handleResolve, handleReject);
  await promisePool.execute(`SELECT deposit FROM bills WHERE uid = ${id}`).then(handleResolve, handleReject);
  user.expire = calcExpireDate(user);

  return user;
};

module.exports = { getUser };
