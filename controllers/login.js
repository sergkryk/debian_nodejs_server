const jwt = require("../utils/jwt");

const AdminsModel = require("../models/admins");

async function verify(req, res, next) {
  res.render("login", {
    title: "Login page",
  });
}

async function auth(req, res, next) {
  try {
    const { login, pass } = req.body;
    const response = await AdminsModel.fetchById(login);
    if (response.id !== login || response.password !== pass) {
      throw new Error('Login or password does not match!')
    }
    if (response.disable === 1) {
      throw new Error('This account is disabled!')
    } 
    const token = jwt.createToken({ aid: response?.aid, id: response?.id, name: response?.name });
    res.cookie('token',token);
    res.status(200).send();
  } catch (error) {
    res.status(401).send();
  }
}

module.exports = { verify, auth };
