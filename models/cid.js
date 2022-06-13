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
  static async reset(id, userIp) {
    const currentValue = await this.fetchById(id);
    await pool.execute(`UPDATE dv_main SET cid='' WHERE uid = ${id}`);
    await pool.execute(`INSERT INTO admin_actions(actions, datetime, ip, uid, aid, module, action_type) VALUES('CID ${currentValue[0].cid} was cleaned', now(), INET_ATON('${userIp}'), ${id}, 3, 'Dv', 2);`);
  }
  static async getAddresses(cid) {
    const query = `SELECT d.cid, d.uid, u.address_street, u.address_build, u.address_flat FROM dv_main d INNER JOIN users_pi u ON d.uid = u.uid WHERE d.cid = '${cid}';`;
    const [response] = await pool.execute(query);
    return response;
  }
}
