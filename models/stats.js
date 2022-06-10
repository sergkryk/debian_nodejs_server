const pool = require('../utils/db');

module.exports = class {
  static async fetchById(id) {
    const [response] = await pool.execute(`SELECT duration, recv, sent, (UNIX_TIMESTAMP(start) * 1000) as start FROM dv_log WHERE uid = ${id} ORDER BY start DESC`);
    return response;
  }
  static async fetchByDates(id, start, end) {
    const [response] = await pool.execute(`SELECT duration, recv, sent, (UNIX_TIMESTAMP(start) * 1000) as start FROM dv_log WHERE uid = ${id} AND start BETWEEN '${start}}' AND '${end}';`);
    return response;
  }
}
