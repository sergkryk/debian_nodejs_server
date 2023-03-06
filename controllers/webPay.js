const UserModel = require("../models/users");
const UserPiModel = require("../models/users_pi");
const BillsModel = require("../models/bills");
const PaymentsModel = require("../models/payments");

const address = require("../utils/address");

async function check(req, res, next) {
  if (req.query.account) {
    const { account } = req.query;
    const { uid } = await UserModel.fetchByLogin(account);
    if (uid) {
      const {
        city,
        fio,
        address_street: street,
        address_build: build,
        address_flat: flat,
      } = await UserPiModel.fetchByUid(uid);
      const addressString = `${address.getCity(city)}, ${address.getStreet(
        street
      )}, ${address.getBuild(build, flat)}`;

      res.render("pay", {
        title: "Account",
        uid,
        account,
        fio,
        street: addressString,
      });
    } else {
      res.render("check", { title: "Error", notFound: true });
    }
  } else {
    res.render("check", { title: "Initial State", notFound: false });
  }
}

async function pay(req, res, next) {
  const { sum, address, uid, account } = req.body;
  const { deposit } = await BillsModel.fetchByUid(uid);

  const updatedDeposit = Number(deposit) + Number(sum);
  const response = await BillsModel.update(uid, updatedDeposit);

  if (response.changedRows == 1) {
    await PaymentsModel.addPay(uid, "", "", sum, req.query.address, "0");
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
