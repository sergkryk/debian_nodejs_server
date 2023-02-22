const pool = require("../utils/db");

async function recordCancelPayment(uid, transactionId, ip) {
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
      'Transaction ${transactionId} canceled',
      NOW(),
      INET_ATON('${ip}'),
      ${uid},
      3,
      10
    );`
  );
}

module.exports = { recordCancelPayment };