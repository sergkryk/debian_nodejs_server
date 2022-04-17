const pool = require('../db/db');

function getUserInfo(userId, cb) {
  if (userId) {
    pool.execute(`SELECT 
                    users.disable as isDisabled,
                    users.id as login,
                    users_pi.fio as fio,
                    users_pi.phone as phone,
                    bills.deposit as deposit,
                    users_pi.city,
                    users_pi.address_street,
                    users_pi.address_build,
                    users_pi.address_flat,
                    payments.sum,
                    payments.date
                  FROM users
                    INNER JOIN users_pi ON users.uid = users_pi.uid
                    INNER JOIN bills ON users.uid  = bills.uid
                    INNER JOIN payments ON users.uid = payments.uid
                  WHERE users.uid = ${userId}
                  ORDER BY payments.date desc
                  LIMIT 1;`, cb);
  }
}
module.exports = getUserInfo;
