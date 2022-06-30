const pool = require('../utils/db');

module.exports = class {
  static async fetchAll() {
    const [response] = await pool.execute(`SELECT * FROM payments`);
    return response;
  }
  static async fetchByUser(userId) {
    const [response] = await pool.execute(`SELECT date, sum, dsc, method FROM payments WHERE uid = ${userId}`);
    return response;
  }
}
