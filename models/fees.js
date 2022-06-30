const pool = require('../utils/db');

module.exports = class {
  static async fetchAll() {
    const [response] = await pool.execute(`SELECT * FROM fees`);
    return response;
  }
  static async fetchByUser(userId) {
    const [response] = await pool.execute(`SELECT date, sum, dsc, method FROM fees WHERE uid = ${userId}`);
    return response;
  }
  static async fetchUserLast(userId) {
    const [response] = await pool.execute(`SELECT id, date, sum, dsc, method FROM fees WHERE id = (SELECT max(id) as id FROM fees WHERE uid = ${userId})`);
    return response;
  }
}