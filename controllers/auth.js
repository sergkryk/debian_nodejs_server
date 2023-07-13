const UserModel = require("../models/users");
const UserPiModel = require("../models/users_pi");
const BillsModel = require("../models/bills");
const TarifModel = require("../models/tarifs");

async function check(challenger) {
  const { login: chLogin, password: chPass } = challenger;
  const { uid } = await UserModel.fetchByLogin(chLogin);
  if (uid) {
    const { password } = await UserModel.fetchPasswordByUid(uid);
    return password === chPass;
  }
  return false;
}

async function fetchUser(login) {
  const user = await UserModel.fetchByLogin(login);
  const userPi = await UserPiModel.fetchByUid(user?.uid);
  const userBill = await BillsModel.fetchByUid(user?.uid);
  const { tp_id } = await TarifModel.fetchByUid(user?.uid);
  const { name, month_fee, day_fee } = await TarifModel.fetchById(tp_id);
  return [user, userPi, userBill, { name, month_fee, day_fee }];
}

async function auth(req, res, next) {
  try {
    const isValid = await check(req?.body);
    if (isValid) {
      const user = await fetchUser(req?.body?.login);
      res.json(user);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.json([]);
  }
}

module.exports = { auth };
