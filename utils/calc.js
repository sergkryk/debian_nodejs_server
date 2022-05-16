const getNextFee = (params) => {
  const { deposit, tp } = params;
  if (deposit <= 0 || tp.tp_fee === 0) {
    return {sum: 0, date: '0000000000000', dsc: 'Нет запланированных платежей по Вашему счёту'};
  }
  const today = new Date();
  return {
    sum: tp.tp_fee,
    date: tp.isDayly ? today.setDate(today.getDate() + 1) : today.setMonth(today.getMonth() + 1, 1),
    dsc: `Периодическое списание согласно тарифному плану "${tp.tp_name}"`
  };
}

const getExpireDate = (params) => {
 const { tp, deposit } = params
  if (deposit <= 0 || tp.tp_fee <= 0) {
    return new Date();
  }
  const today = new Date();
  const period = tp.is_dayly ? Math.ceil(deposit / tp.tp_fee) - 1 : Math.floor(deposit / tp.tp_fee) + 1;
  const date = tp.is_dayly ? today.setDate(today.getDate() + period) : today.setMonth(today.getMonth() + period, 0);
  return date;
}

const getTariff = (user, tp) => {
  const { reduction } = user;
  const { name, day_fee, month_fee } = tp;
  return {
    tp_name: name,
    tp_fee: (() => {
      let fee = day_fee ? day_fee : month_fee;
      return reduction ? fee - (fee * reduction / 100) : fee;
    })(),
    is_dayly: day_fee > 0,
  }
}

module.exports = {
  getNextFee,
  getExpireDate,
  getTariff,
}