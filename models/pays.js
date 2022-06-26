const pool = require('../utils/db');

module.exports = class {
  static async fetchAll(orderby = 'DESC', rows = 25) {
    const [response] = await pool.execute(`SELECT * FROM payments ORDER BY date ${orderby} LIMIT ${rows}`);
    return response;
  }
  static async fetchPaysByUser(userId, orderby = 'DESC', rows = 25) {
    const [response] = await pool.execute(`SELECT date, sum, dsc, method FROM payments WHERE uid = ${userId} ORDER BY date ${orderby} LIMIT ${rows}`);
    return response;
  }
}
