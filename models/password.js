const pool = require('../utils/db');
const { dbSecret } = require('../config/secret');

module.exports = class {
  static async fetchById(id) {
    const [response] = await pool.execute(`SELECT password, CONVERT(DECODE(password, '${dbSecret}') USING utf8) as password FROM users WHERE uid = ${id}`);
    return response;
  }
  static async update(id, userIp, newValue) {
    await pool.execute(`UPDATE users SET password = ENCODE('${newValue}', '${dbSecret}') WHERE uid = ${id}`);
    await pool.execute(`INSERT INTO admin_actions(actions, datetime, ip, uid, aid, module, action_type) VALUES('Password was changed by user', now(), INET_ATON('${userIp}'), ${id}, 3, '', 2);`);
  }
}
