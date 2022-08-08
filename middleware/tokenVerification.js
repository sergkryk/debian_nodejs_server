const jwt = require("jsonwebtoken");
const cookie = require('cookie');
const { secret } = require("../config/secret");

const authenticateToken = function(req, res, next) {
  try {
    console.log(req.headers.cookie);
    const { token } = cookie.parse(req.headers.cookie);
    const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
    req.auth = { uid: decoded.id };
    next();
  } 
  catch (error) {
    console.log(error);
    res.status(401).send();
  }
}

module.exports =  authenticateToken;