const jwt = require("../utils/jwt");
const parseCookies = require("../utils/parseCookies");


const tokenVerification = function (req, res, next) {
  try {
    const cookies = parseCookies(req);
    if (cookies?.token) {
      const verified = jwt.verifyToken(cookies.token);
      req.body.uid = verified.id;
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.redirect("login");
  }

};

module.exports = tokenVerification;
