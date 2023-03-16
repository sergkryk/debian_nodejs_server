const dbQuery = require("../utils/database");

async function fetchByExId(ex_id) {
  const data = await dbQuery(`SELECT * FROM payments WHERE ext_id = ${ex_id}`);
  return data;
}

async function fetchById(id) {
  const data = await dbQuery(`SELECT * FROM payments WHERE id = ${id}`);
  return data;
}

async function addPay(
  uid,
  transactionId,
  transactionDate,
  amount,
  ip,
  aid,
  method
) {
  const data = await dbQuery(`INSERT INTO payments (
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
  )`);
  return data;
}

async function removePay(transactionId) {
  const data = await dbQuery(
    `DELETE FROM payments WHERE ext_id = ${transactionId}`
  );
  return data;
}

module.exports = { fetchByExId, fetchById, addPay, removePay };
