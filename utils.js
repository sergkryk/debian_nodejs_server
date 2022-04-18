// to calc remaining days if user's tariff has dayly fee
function getValidDays(deposit, dayFee, reduction) {
  if (reduction > 0) {
    dayFee = dayFee - dayFee * (reduction / 100);
  }
  const validPeriod = Math.ceil(deposit / dayFee) - 1;

  const currentDate = new Date();
  const expDate = currentDate.setDate(currentDate.getDate() + validPeriod);
  console.log(new Date(expDate));
  return expDate;
};

// to calc remaining monthes if user tariff has monthly fee
function getValidMonthes(deposit, monthFee, reduction) {
  if (reduction > 0) {
    monthFee = monthFee - monthFee * (reduction / 100);
  }
  const validPeriod = Math.floor(deposit / monthFee) + 1;

  const currentDate = new Date();
  const expDate = currentDate.setMonth(currentDate.getMonth() + validPeriod, 0);
  console.log(new Date(expDate));
  return expDate;
};

// to calc expiration date depending on deposit, type of fee and reduction
function calcExpireDate(user) {
  const { deposit, day_fee: dayFee, month_fee: monthFee, reduction } = user;
  if (deposit <= 0) {
    return "Аккаунт заблокирован"
  }
  if (user.day_fee > 0) {
    return getValidDays(deposit, dayFee, reduction);
  }
  if (user.month_fee > 0) {
    return getValidMonthes(deposit, monthFee, reduction);
  }
  return "Без ограничений";
}

module.exports = {
  calcExpireDate,
};
