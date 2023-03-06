const pool = require("../utils/db");
const jwt = require("../utils/jwt");

async function verify(req, res, next) {
  res.render("login", {
    title: "Login page",
  });
}

async function auth(req, res, next) {
  try {
    const { login, pass } = req.body;
    
  } catch (error) {
    
  }

  const token = jwt.createToken({id: '123'});
  res.cookie('token',token);
  res.json({bearer: token})
}

module.exports = { verify, auth };
