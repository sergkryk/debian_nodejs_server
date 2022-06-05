const pool = require('../utils/db');

module.exports = class {
  static async fetchById(id) {
    const [response] = await pool.execute(`SELECT start, duration, recv, sent FROM dv_log WHERE uid = ${id}`);
    return response;
  }
}
