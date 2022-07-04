const pool = require('../utils/db');

module.exports = class {
  static async fetchById(id) {
    const [response] = await pool.execute(`SELECT duration, recv, sent, (UNIX_TIMESTAMP(start) * 1000) as start FROM dv_log WHERE uid = ${id} ORDER BY start DESC`);
    return response;
  }
  static async fetchByDates(id, period) {
    const {begin, end} = period;
    const req = `SELECT duration, recv, sent, (UNIX_TIMESTAMP(start) * 1000) as start FROM dv_log WHERE uid = ${id} AND start BETWEEN FROM_UNIXTIME(${begin / 1000}) AND FROM_UNIXTIME(${end / 1000})`;
    const [response] = await pool.execute(req);
    return response;
  }
}
