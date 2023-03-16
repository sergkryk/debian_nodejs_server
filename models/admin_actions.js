const dbQuery = require("../utils/database");

async function logAction(uid, transactionId, ip, aid) {
  const data = await dbQuery(
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
      ${aid},
      10
    );`
  );
  return data;
}

module.exports = { logAction };
