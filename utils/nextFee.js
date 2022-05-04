const { getInfo } = require('../models/info') 

const calcNextUserFee = async function (id) {
  const { tariff, deposit, reduction, day_fee, month_fee } = await getInfo(id)
  const today = new Date();
  
  if (deposit < 0) {
    console.log('Заблокирован');
    return;
  }
  
  if (day_fee > 0) {
    const next = today.setDate(today.getDate() + 1);
    return {
      date: next,
      sum: day_fee - (day_fee * (reduction / 100)),
      dsc: `Ежедневное списание согласно тарифному плану "${tariff}"`,
    }
  }

  if (month_fee) {
    const next = today.setMonth(today.getMonth() + 1, 1);
    return {
      date: next,
      sum: month_fee - (month_fee * (reduction / 100)),
      dsc: `Ежемесячное списание согласно тарифному плану "${tariff}"`,
    }
  }
}

module.exports = {
  calcNextUserFee,
};