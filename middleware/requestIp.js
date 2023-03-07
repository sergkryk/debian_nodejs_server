function setReqIp(req, res, next) {
  const ip = req.ip || req.socket.remoteAddress;
  if (ip) {
    req.query.address = ip;
  } else {
    req.query.address = "";
  }
  next();
}

module.exports = setReqIp;
