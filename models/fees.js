const pool = require('../utils/db');

// const calcNextFeeDetails = (deposit, reduction, tariff) => {
//   const { name, fee, isDayly } = tariff; 
//   if (deposit <= 0 || fee === 0) {
//     return {sum: 0, date: '0000000000000', dsc: 'Нет запланированных платежей по Вашему счёту'};
//   }
//   const today = new Date();
//   return {
//     sum: reduction ? fee * reduction / 100 : fee,
//     date: isDayly ? today.setDate(today.getDate() + 1) : today.setMonth(today.getMonth() + 1, 1),
//     dsc: `Периодическое списание согласно тарифному плану "${name}"`
//   };
// }

// const calcExpireDate = (deposit, reduction, tariff) => {
//   const { fee, isDayly } = tariff;
//   if (deposit <= 0 || fee <= 0) {
//     return new Date();
//   }
//   const today = new Date();
//   const finalFee = reduction ? fee * reduction / 100 : fee;
//   const period = isDayly ? Math.ceil(deposit / finalFee) - 1 : Math.floor(deposit / finalFee) + 1;
//   const date = isDayly ? today.setDate(today.getDate() + period) : today.setMonth(today.getMonth() + period, 0);
//   return date;
// }

const fetchAllFees = async function(orderby = 'DESC', rows = 25) {
  const [ fee ] = await pool.execute(`SELECT * FROM fees ORDER BY date ${orderby} LIMIT ${rows}`);
  return fee;
}
const fetchUserFees = async function(userId, orderby = 'DESC', rows = 25) {
  const [ fee ] = await pool.execute(`SELECT * FROM fees WHERE uid = ${userId} ORDER BY date ${orderby} LIMIT ${rows}`);
  return fee;
}


module.exports = {
  fetchAllFees,
  fetchUserFees,
};