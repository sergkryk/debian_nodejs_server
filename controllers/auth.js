const UserModel = require("../models/users");
const UserPiModel = require("../models/users_pi");
const BillsModel = require("../models/bills");
const TarifModel = require("../models/tarifs");

const loginRegExp = new RegExp(/^[1|2|3|4]\d{3}$/);
const passwordRegExp = new RegExp(/^\d{6}$/);

async function check(challenger) {
  const { login: chLogin, password: chPass } = challenger;
  const isValidLoginFormat = loginRegExp.test(String(chLogin));
  const isValidPassFormat = passwordRegExp.test(String(chPass));
  if(isValidLoginFormat && isValidPassFormat) {
    const response = await UserModel.fetchByLogin(chLogin);
    if (response?.uid) {
      const { password } = await UserModel.fetchPasswordByUid(response?.uid);
      return password === chPass;
    }
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
      res.status(401).send();
    }
  } catch (error) {
    res.json([]);
  }
}

module.exports = { auth };
