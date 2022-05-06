const pool = require('../utils/db');
const { dbQuery } = require('../utils/utils');
const { generateUserAddress, formatPhoneNumber } = require('../utils/pi');

class User {
  constructor(id) {
    this.id = id;
  }
  async getAll() {
    return {
      uid: await this.getUid(),
      login: await this.getLogin(),
      password: await this.getPassword(),
      deposit: await this.getDeposit(),
      reduction: await this.getReduction(),
      cid: await this.getCid(),
      tp: await this.getTariff(),
      pi: await this.getPersonal(),
      billing: {
        prevPayment: await this.getPrevPayment(),
        prevFee: await this.getPrevFee(),
        nextFee: await this.calcNextFee(),
        expireDate: await this.calcExpireDate(),
      }
    }
  }
  async getUid() {
    const uid = await dbQuery('uid', `SELECT id FROM users WHERE uid = ${this.id}`) >= 0;
    return uid;
  }
  async getLogin() {
    const login = await dbQuery('id', `SELECT id FROM users WHERE uid = ${this.id}`);
    return login;
  }
  async getPassword() {
    const password = await dbQuery('password', `SELECT password, CONVERT(DECODE(password, 'abills345678901234490137') USING utf8) as password FROM users WHERE uid = ${this.id}`);
    return password;
  }
  async getReduction() {
    const reduction = await dbQuery('reduction', `SELECT reduction FROM users WHERE uid = ${this.id}`);
    return reduction;
  }
  async getCid() {
    const cid = await dbQuery('cid', `SELECT cid FROM dv_main WHERE uid = ${this.id}`);
    return cid;
  }
  async getDeposit() {
    const deposit = await dbQuery('deposit', `SELECT deposit FROM bills WHERE uid = ${this.id}`);
    return deposit;
  }
  async getTariff() {
    const tp_id = await dbQuery('tp_id', `SELECT tp_id FROM dv_main WHERE uid = ${this.id}`);
    if (tp_id) {
      return {
        name: await dbQuery('name', `SELECT name FROM tarif_plans WHERE id = ${tp_id}`),
        dayFee: await dbQuery('day_fee', `SELECT day_fee FROM tarif_plans WHERE id = ${tp_id}`),
        monthFee: await dbQuery('month_fee', `SELECT month_fee FROM tarif_plans WHERE id = ${tp_id}`),
        isDayly: this.dayFee > 0,
      }
    } else {
      return {}
    }
  }
  async getPersonal() {
    return {
      fio: await dbQuery('fio', `SELECT fio FROM users_pi WHERE uid = ${this.id}`),
      phone: await dbQuery('phone', `SELECT phone FROM users_pi WHERE uid = ${this.id}`),
      email: await dbQuery('email', `SELECT email FROM users_pi WHERE uid = ${this.id}`),
      city: await dbQuery('city', `SELECT city FROM users_pi WHERE uid = ${this.id}`),
      street: await dbQuery('address_street', `SELECT address_street FROM users_pi WHERE uid = ${this.id}`),
      build: await dbQuery('address_build', `SELECT address_build FROM users_pi WHERE uid = ${this.id}`),
      flat: await dbQuery('address_flat', `SELECT address_flat FROM users_pi WHERE uid = ${this.id}`),
      zip: await dbQuery('zip', `SELECT zip FROM users_pi WHERE uid = ${this.id}`),
    }
  }

  async getPrevFee() {
    return {
      sum: await dbQuery('sum', `SELECT sum FROM fees WHERE uid = ${this.id} ORDER BY date DESC LIMIT 1;`),
      date: await dbQuery('date', `SELECT date FROM fees WHERE uid = ${this.id} ORDER BY date DESC LIMIT 1;`),
      dsc: await dbQuery('dsc', `SELECT dsc FROM fees WHERE uid = ${this.id} ORDER BY date DESC LIMIT 1;`),
    }
  }

  async getPrevPayment() {
    return {
      sum: await dbQuery('sum', `SELECT sum FROM payments WHERE uid = ${this.id} ORDER BY date DESC LIMIT 1;`),
      date: await dbQuery('date', `SELECT date FROM payments WHERE uid = ${this.id} ORDER BY date DESC LIMIT 1;`),
      method: await dbQuery('method', `SELECT method FROM payments WHERE uid = ${this.id} ORDER BY date DESC LIMIT 1;`),
    }
  }

  async calcExpireDate() {
    const deposit = await this.getDeposit();
    const tariff = await this.getTariff(); 
    const reduction = await this.getReduction();
    return this._getExpireDate(deposit, reduction, tariff.isDayly ? tariff.dayFee : tariff.monthFee, tariff.isDayly);
  }

  async calcNextFee() {
    const deposit = await this.getDeposit();
    const { name, dayFee, monthFee, isDayly } = await this.getTariff(); 
    const reduction = await this.getReduction();
    const today = new Date();
    
    const fee = isDayly ? dayFee : monthFee;
    const final = reduction ? fee * reduction / 100 : fee;

    if (deposit <= 0 || dayFee === 0 && monthFee === 0) {
      return {sum: 0, date: '0000000000000', dsc: 'Нет запланированных платежей по Вашему счёту'};
    }
    const nextFeeDate = isDayly ? today.setDate(today.getDate() + 1) : today.setMonth(today.getMonth() + 1, 1)
    return {
      sum: final,
      date: nextFeeDate,
      dsc: `Периодическое списание согласно тарифному плану "${name}"`
    };
  }

  _getExpireDate(deposit, reduction, fee, isDayly) {
    if (deposit <= 0) {
      return new Date();
    }
    if (fee <= 0) {
      return new Date();
    }
    const today = new Date();
    const finalFee = reduction ? fee * reduction / 100 : fee;
    const period = isDayly ? Math.ceil(deposit / finalFee) - 1 : Math.floor(deposit / finalFee) + 1;
    const date = isDayly ? today.setDate(today.getDate() + period) : today.setMonth(today.getMonth() + period, 0);
    return date;
  }
}

module.exports = 
{
  User,
};