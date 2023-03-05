const UserModel = require("../models/users");
const UserPiModel = require("../models/users_pi");

const address = require("../utils/address");

function check(req, res, next) {
  if (req.query.account) {
    res.redirect(`/webpay/${req.query.account}`);
  } else {
    res.render("check", { title: "Dynamic title" });
  }
}

async function pay(req, res, next) {
  const account = req.params.account;
  const { uid } = await UserModel.fetchByLogin(account);
  const {
    city,
    fio,
    address_street: street,
    address_build: build,
    address_flat: flat,
  } = await UserPiModel.fetchByUid(uid);

  const addressString = `${address.getCity(city)}, ${address.getStreet(street)}, ${address.getBuild(build, flat)}`;

  res.render("pay", {
    account: req.params.account,
    fio,
    street: addressString,
  });
}

module.exports = { check, pay };
