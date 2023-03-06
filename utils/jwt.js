const jwt = require("jsonwebtoken");

function createToken(user) {
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET
  );
  return token;
}

function verifyToken(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}

module.exports = { createToken, verifyToken };
