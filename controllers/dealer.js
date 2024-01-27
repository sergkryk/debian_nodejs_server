const UserModel = require("../models/users");
const UserPiModel = require("../models/users_pi");

const address = require("../utils/address");
const messages = require("../utils/sms");
const messageTemplates = require("../utils/messageTemplates.js");
const logToFile = require("../utils/log");
const addTransaction = require("../modules/addTransaction");
const lanbillingAdmins = require("../config/lanbillingAdminsDict");

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
    const { city, fio, phone, address_street, address_build, address_flat } =
      await UserPiModel.fetchByUid(uid);
    const addressString = `${address.getCity(city)} ${address.getStreet(
      address_street
    )} ${address.getBuild(address_build, address_flat)}`;

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
  logToFile(
    "requests.txt",
    `пользователь: user_${account}, сумма: ${sum} рублей, администратор: ${admin.name}\n`
  );
  try {
    const billUpdateQuery = await addTransaction({
      aid: admin.aid,
      ip: req.query.requestIp,
      uid,
      sum,
      lanbilling: {
        account,
        amount: sum,
        aid: lanbillingAdmins[admin.aid],
      }
    });
    if (billUpdateQuery.status === "success") {
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
    logToFile(
      "errors.txt",
      `пользователь: user_${account}, сумма: ${sum} рублей, администратор: ${admin.name}, ошибка: ${error.message} \n`
    );
    res.render("fail", {
      sum: sum,
      account,
      fio,
      address: address || "",
    });
  }
}

module.exports = { check, pay };
