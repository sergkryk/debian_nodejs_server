const pool = require("../utils/db");

async function sendPay(uid, transactionId, transactionDate, amount, ip) {
  const today = new Date().getTime();
  // создаём запись об оплате в таблице payments //
  await pool.execute(
    `INSERT INTO payments (
        date,
        sum,
        dsc,
        ip,
        last_deposit,
        uid,
        aid,
        method,
        ext_id,
        bill_id,
        inner_describe,
        currency,amount
        )
       VALUES (
        FROM_UNIXTIME(${today / 1000}),
        '${amount}',
        '${transactionDate}',
        INET_ATON('${ip}'),
        (SELECT deposit FROM bills WHERE uid = ${uid}),
        ${uid},
        3,
        1,
        '${transactionId}',
        (SELECT id FROM bills WHERE uid = ${uid}),
        '',
        0,
        '${amount}'
      )`
  );
  // обновляем депозит в таблице bills у пользователя //
  await pool.execute(
    `UPDATE bills SET deposit = deposit + ${parseFloat(
      amount
    )} where uid = ${uid}`
  );
}

module.exports = sendPay;
