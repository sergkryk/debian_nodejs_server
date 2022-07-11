const pool = require('../utils/db');

module.exports = class {
  static async check(card) {
    console.log(card);
    // await pool.execute(`UPDATE users SET password = ENCODE('${newValue}', '${dbSecret}') WHERE uid = ${id}`);
    // await pool.execute(`INSERT INTO admin_actions(actions, datetime, ip, uid, aid, module, action_type) VALUES('Password was changed by user', now(), INET_ATON('${userIp}'), ${id}, 3, '', 2);`);
  }
  static async use(card) {
    console.log(card);
    // await pool.execute(`UPDATE users SET password = ENCODE('${newValue}', '${dbSecret}') WHERE uid = ${id}`);
    // await pool.execute(`INSERT INTO admin_actions(actions, datetime, ip, uid, aid, module, action_type) VALUES('Password was changed by user', now(), INET_ATON('${userIp}'), ${id}, 3, '', 2);`);
  }
}
