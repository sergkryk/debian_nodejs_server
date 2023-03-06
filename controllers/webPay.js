const UserModel = require("../models/users");
const UserPiModel = require("../models/users_pi");
const BillsModel = require("../models/bills");
const PaymentsModel = require("../models/payments");

const address = require("../utils/address");

async function check(req, res, next) {
  if (!req.query.account) {
    res.render("check", { title: "Initial State", notFound: false });
    return;
  }
  try {
    const { uid } = await UserModel.fetchByLogin(req.query?.account);
    if (!uid) {
      throw new Error()
    }
    const { city, fio, address_street, address_build, address_flat } = await UserPiModel.fetchByUid(uid);
    const addressString = `${address.getCity(city)}, ${address.getStreet(address_street)}, ${address.getBuild(address_build, address_flat)}`;

    res.render("pay", {
      title: "Account",
      uid,
      account: req.query?.account,
      fio,
      street: addressString,
    });
  } catch (error) {
    res.render("check", { title: "Error", notFound: true });
  }
}

async function pay(req, res, next) {
  const admin = req.body.admin;
  const { sum, address, uid, account } = req.body;
  const { deposit } = await BillsModel.fetchByUid(uid);

  const updatedDeposit = Number(deposit) + Number(sum);
  const response = await BillsModel.update(uid, updatedDeposit);

  if (response.changedRows == 1) {
    await PaymentsModel.addPay(uid, "", "", sum, req.query.address, "0", admin.aid);
    res.render("success", {
      sum: sum,
      account,
      address: address || "",
    });
  } else {
    res.render("fail", {
      sum: sum,
      account,
      address: address || "",
    });
  }
}

module.exports = { check, pay };
