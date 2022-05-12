const pool = require('../utils/db');

// const renderTariffDetails = (res) => {
//   const { tp_id, name, dayFee, monthFee } = res;
//   if (!tp_id) {
//     return 'The tariff not found'
//   }
//   return {
//     id: tp_id,
//     name,
//     fee: dayFee ? dayFee : monthFee,
//     isDayly: this.fee === dayFee,
//   }
// }

const fetchAll = async function () {
  const [ tariffs ] = await pool.execute(`SELECT * FROM tarif_plans`);
  return tariffs;
}

const fetchUserTariff = async function (userId) {
  const [ tariff ] = await pool.execute(`SELECT d.tp_id, t.* FROM dv_main d INNER JOIN tarif_plans t ON d.tp_id = t.id WHERE d.uid = ${userId}`);
  return tariff;
}

module.exports = {
  fetchAll,
  fetchUserTariff,
};