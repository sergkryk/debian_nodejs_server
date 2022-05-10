const billing = {
  userPrevFee: `SELECT sum, date, dsc FROM fees WHERE uid = ? ORDER BY date DESC LIMIT 1;`,
  userPrevPay: `SELECT sum, date, method, dsc FROM payments WHERE uid = ? ORDER BY date DESC LIMIT 1;`
}

module.exports = billing;
