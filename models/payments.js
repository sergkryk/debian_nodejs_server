const pool = require("../utils/db");
const { processResponse } = require("../utils/dbValidation");

async function fetchByExId(ex_id) {
  const response = await pool.execute(
    `SELECT * FROM payments WHERE ext_id = ${ex_id}`
  );
  const data = processResponse(response);
  return data;
}

async function addPay(uid, transactionId, transactionDate, amount, ip, method, aid = 5) {
  const response = await pool.execute(
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
        currency,
        amount
        )
       VALUES (
        NOW(),
        '${amount}',
        '${transactionDate}',
        INET_ATON('${ip}'),
        (SELECT deposit FROM bills WHERE uid = ${uid}),
        ${uid},
        ${aid},
        ${method},
        '${transactionId}',
        (SELECT id FROM bills WHERE uid = ${uid}),
        '',
        0,
        '${amount}'
      )`
  );
  const data = processResponse(response);
  return data;
}

async function removePay(transactionId) {
  const response = await pool.execute(
    `DELETE FROM payments WHERE ext_id = ${transactionId}`
  );
  const data = processResponse(response);
  return data;
}

module.exports = { fetchByExId, addPay, removePay };
