const pool = require('../utils/db');

module.exports = class {
  static async fetchAll() {
    const [response] = await pool.execute(`SELECT cid, uid FROM dv_main`);
    return response;
  }
  static async fetchById(id) {
    const [response] = await pool.execute(`SELECT cid FROM dv_main WHERE uid = ${id}`);
    return response;
  }
  static async reset(id) {
    const [ request ] = await pool.execute(`UPDATE dv_main SET cid='' WHERE uid = ${id}`);
    return request;
  }
}
