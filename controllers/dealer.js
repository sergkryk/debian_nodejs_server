const UserModel = require("../models/users");
const UserPiModel = require("../models/users_pi");
const BillsModel = require("../models/bills");
const PaymentsModel = require("../models/payments");

const address = require("../utils/address");
const messages = require("../utils/sms");
const messageTemplates = require("../utils/messageTemplates.js");

const PAY_TYPE = 0;

async function check(req, res, next) {
  if (!req.query.account) {
    res.render("check", { title: "Initial State", notFound: false });
    return;
  }
  try {
    const { uid } = await UserModel.fetchByLogin(req.query?.account);
    if (!uid) {
      throw new Error();
    }
    const { city, fio, phone, address_street, address_build, address_flat } = await UserPiModel.fetchByUid(uid);
    const addressString = `${address.getCity(city)} ${address.getStreet(address_street)} ${address.getBuild(address_build, address_flat)}`;

    res.render("pay", {
      title: "Account",
      uid,
      account: req.query?.account,
      fio,
      street: addressString,
      phone,
    });
  } catch (error) {
    res.render("check", { title: "Error", notFound: true });
  }
}

async function updateUserDeposit(aid, ip, uid, sum) {
  // записываю платёж в таблицу payments
  const paymentRecordRequest = await PaymentsModel.addPay(
    uid,
    "",
    "",
    sum,
    ip,
    aid,
    PAY_TYPE,
  );
  // получаю запись о платеже из таблицы payments
  const paymentRecord = await PaymentsModel.fetchById(paymentRecordRequest.insertId);
  // сравниваю данные с записью в таблице
  if (Number(paymentRecord.sum) !== Number(sum) || Number(paymentRecord.uid) !== Number(uid)) {
    throw new Error("Failed to log payment!");
  }
  // обновляю депозит пользователя
  await BillsModel.update(uid, Number(paymentRecord.sum) + Number(paymentRecord.last_deposit));
  // сравниваю депозит в таблице с отправленными данными для перестраховки
  const { deposit } = await BillsModel.fetchByUid(uid);
  if (Number(deposit) !== Number(paymentRecord.sum) + Number(paymentRecord.last_deposit)) {
    throw new Error("Failed to update deposit!");
  }
  return {
    uid,
    sum,
    deposit,
    paymentId: paymentRecordRequest.insertId,
    status: 'success',
  }
}

async function pay(req, res, next) {
  const admin = req.body.admin;
  const { sum, address, fio, uid, account, phone } = req.body;
  try {
    const billUpdateQuery = await updateUserDeposit(admin.aid, req.query.requestIp, uid, sum);
    if ( billUpdateQuery.status === 'success' ) {
      messages.single({
        number: phone,
        message: messageTemplates.paid(account, sum, billUpdateQuery.deposit),
      });
      res.render("success", {
        sum: sum,
        account,
        fio,
        address: address || "",
      });
    }
  } catch (error) {
    res.render("fail", {
      sum: sum,
      account,
      fio,
      address: address || "",
    });
  }
}

module.exports = { check, pay };
