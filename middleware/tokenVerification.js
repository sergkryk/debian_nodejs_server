const jwt = require("jsonwebtoken");
const { secret } = require("../config/secret");

const authenticateToken = function(req, res, next) {
  const authHeader = req.headers['authorization']
  const bearer = authHeader.split(' ');
  const token = bearer[1];
  
  if(!token) {
    res.sendStatus(401)
  }

  try {
    const decoded = jwt.verify(token, secret, {algorithms: ['HS256']});
    console.log(decoded);
    req.params.uid = decoded.id;
    next();
  } 
  catch (error) {
    res.status(403).send({"message": error.message});
  }
}

module.exports =  authenticateToken;