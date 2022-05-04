const { fetchLastUserPayments } = require('./payments');
const { fetchLastUserFees } = require('./fees');
const { calcNextUserFee } = require('../utils/nextFee');

const getRecentFinances = async function (id) {
  const recent = {}
  recent.payment = await fetchLastUserPayments(id);
  recent.fee = await fetchLastUserFees(id);
  recent.next = await calcNextUserFee(id);
  
  console.log(recent);

  return recent;
};

module.exports = 
{
  getRecentFinances,
};