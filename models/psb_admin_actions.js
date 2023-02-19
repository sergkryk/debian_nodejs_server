const pool = require("../utils/db");

async function recordCancelPayment(uid, transactionId, ip) {
  const today = new Date().getTime();
  const response = await pool.execute(
    `INSERT INTO admin_actions (
      actions,
      datetime,
      ip,
      uid,
      aid,
      action_type
    )
    VALUES (
      'PSB Transaction ${transactionId} canceled',
      FROM_UNIXTIME(${today / 1000}),
      INET_ATON('${ip}'),
      ${uid},
      3,
      10
    );`
  );
  console.log(response);
}

module.exports = { recordCancelPayment };