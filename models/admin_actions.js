const pool = require("../utils/db");
const { processResponse } = require("../utils/dbValidation");

async function logAction(uid, transactionId, ip) {
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
  const data = processResponse(response);
  return data;
}

module.exports = { logAction };
