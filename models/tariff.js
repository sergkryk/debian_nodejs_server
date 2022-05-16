const pool = require('../utils/db');

const fetchAll = async function () {
  const [ tariffs ] = await pool.execute(`SELECT * FROM tarif_plans`);
  return tariffs;
}

const fetchUserTariff = async function (tpId, keys = '*') {
  const [ tariff ] = await pool.execute(`SELECT ${keys} FROM tarif_plans  WHERE id = ${tpId}`);
  return tariff;
}

module.exports = {
  fetchAll,
  fetchUserTariff,
};