const UserModel = require("../models/users");
const UserPiModel = require("../models/users_pi");
const BillsModel = require("../models/bills");

async function check(challenger) {
  const {login: chLogin, password: chPass} = challenger;
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
  return [user, userPi, userBill];
}

async function auth(req, res, next) {
  try {
    const isValid = await check(req?.body);
    if (isValid) {
      const user = await fetchUser(req?.body?.login);
      res.json(user);
    }
  } catch (error) {
    res.json([]);
  }

}

module.exports = { auth };
