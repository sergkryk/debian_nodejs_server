const pool = require("../utils/db");
const { performance } = require("perf_hooks");

const { fetchUserTariff } = require("./tariff");
const { fetchUserPays } = require("./pays");
const { fetchUserFees } = require("./fees");
const { getUserAddress } = require("./address");
const { getExpireDate, getNextFee, getTariff } = require("../utils/calc");

const fetchUser = async function (userId) {
  try {
    const start = performance.now();
    const [response] =
      await pool.execute(`SELECT u.uid, u.id as login, u.password, 
    CONVERT(DECODE(u.password, 'abills345678901234490137') USING utf8) as password, 
    b.deposit, u.reduction, d.cid, d.tp_id 
    FROM users u 
    INNER JOIN dv_main d ON d.uid = u.uid 
    INNER JOIN bills b ON d.uid = b.uid 
    WHERE u.uid = ${userId}`);
    if (response.length === 0) {
      throw new Error("Пользователя не существует");
    }
    const user = response[0];

    const [tariff] = await fetchUserTariff(
      user.tp_id,
      "name, day_fee, month_fee"
    );
    user.tp = getTariff(user, tariff);

    const [prevPay] = await fetchUserPays(userId, "DESC", 1);
    const [prevFee] = await fetchUserFees(userId, "DESC", 1);
    const address = await getUserAddress(userId);
    const nextFee = getNextFee(user);
    const expireDate = getExpireDate(user);

    user.pi = address;
    user.finance = {
      prevFee,
      prevPay,
      nextFee,
      expireDate,
    };
    const end = performance.now();
    console.log(`The operation took ${end - start} milliseconds`);
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const fetchCid = async function (userId) {
  const [response] = await pool.execute(`SELECT cid FROM dv_main WHERE uid = ${userId}`);
  return response;
}

const resetCid = async function(userId) {
  const [ request ] = await pool.execute(`UPDATE dv_main SET cid='' WHERE uid = ${userId}`);
  return request;
}

module.exports = { fetchUser, fetchCid, resetCid };
