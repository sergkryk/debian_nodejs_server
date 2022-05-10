const userQuery = {
  basic: `SELECT u.uid, u.id as login, u.password, CONVERT(DECODE(u.password, 'abills345678901234490137') USING utf8) as password, b.deposit, u.reduction, d.cid, d.tp_id 
          FROM users u 
          INNER JOIN dv_main d ON d.uid = u.uid 
          INNER JOIN bills b ON d.uid = b.uid 
          WHERE u.uid = ?`,
  tariff: `SELECT d.tp_id, t.name, t.day_fee as dayFee, t.month_fee as monthFee FROM dv_main d INNER JOIN tarif_plans t ON d.tp_id = t.id WHERE d.uid = ?`,
  personal: `SELECT fio, phone, email, city, address_street as street, address_build as build, address_flat as flat FROM users_pi WHERE uid = ?`,
};

module.exports = userQuery;
