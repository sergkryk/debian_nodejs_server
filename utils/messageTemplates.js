function paid(account, sum, deposit) {
  return `На л/с №${account} поступил платёж на сумму ${sum} руб. Баланс ${deposit} руб.`
}

module.exports = { paid };