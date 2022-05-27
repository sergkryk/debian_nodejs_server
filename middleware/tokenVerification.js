const jwt = require("jsonwebtoken");
const { secret } = require("../config/secret");

const authenticateToken = function(req, res, next) {
  try {
    const authHeader = req.headers['authorization']
    const bearer = authHeader.split(' ');
    const token = bearer[1];
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