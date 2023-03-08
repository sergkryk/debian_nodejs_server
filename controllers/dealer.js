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

async function pay(req, res, next) {
  const admin = req.body.admin;
  const { sum, address, fio, uid, account, phone } = req.body;
  try {
    const { deposit } = await BillsModel.fetchByUid(uid);
    const updatedDeposit = Number(deposit) + Number(sum);
    const updateBillRequest = await BillsModel.update(uid, updatedDeposit);
    if (updateBillRequest?.changedRows !== 1) {
      throw new Error("Failed to update deposit!");
    }
    const payRecordRequest = await PaymentsModel.addPay(
      uid,
      "",
      "",
      sum,
      req.query.requestIp,
      admin.aid,
      PAY_TYPE,
    );
    if (!payRecordRequest?.insertId) {
      await BillsModel.update(uid, deposit);
      throw new Error("Failed to log payment!");
    }
    messages.single({
      number: phone,
      message: messageTemplates.paid(account, sum, updatedDeposit),
      isTest: true,
    });
    res.render("success", {
      sum: sum,
      account,
      fio,
      address: address || "",
    });
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
