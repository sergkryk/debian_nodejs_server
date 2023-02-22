const pool = require("../utils/db");
async function sendPay(uid, transactionId, transactionDate, amount, ip, method) {
  // создаём запись об оплате в таблице payments //
  const payRes = await pool.execute(
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
        NOW(),
        '${amount}',
        ${transactionDate},
        INET_ATON('${ip}'),
        (SELECT deposit FROM bills WHERE uid = ${uid}),
        ${uid},
        3,
        ${method},
        '${transactionId}',
        (SELECT id FROM bills WHERE uid = ${uid}),
        '',
        0,
        '${amount}'
      )`
  );

  if (payRes.length > 0 && payRes[0].insertId) {
    return payRes[0].insertId;
  }
  throw new Error("Something went wrong while payment!");
}

module.exports = sendPay;
