const pool = require('../utils/db');

module.exports = class {
  static async fetchAll() {
    const [response] = await pool.execute(`SELECT * FROM fees`);
    return response;
  }
  static async fetchByUser(userId, period) {
    const {begin, end} = period;
    const [response] = await pool.execute(`SELECT id, date, sum, dsc, method, last_deposit FROM fees WHERE uid = ${userId} AND date BETWEEN FROM_UNIXTIME(${begin / 1000}) AND FROM_UNIXTIME(${end / 1000})`);
    return response;
  }
  static async fetchUserLast(userId) {
    const [response] = await pool.execute(`SELECT id, date, sum, dsc, method FROM fees WHERE id = (SELECT max(id) as id FROM fees WHERE uid = ${userId})`);
    return response;
  }
}