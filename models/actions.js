const pool = require('../utils/db');

module.exports = class {
  static async fetchPasswordChangeDate(id) {
    const [response] = await pool.execute(`SELECT actions, datetime FROM admin_actions WHERE uid = ${id} AND actions = 'Password was changed by user' ORDER BY datetime DESC LIMIT 1`);
    return response;
  }
}
