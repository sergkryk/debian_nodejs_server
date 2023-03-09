function setReqIp(req, res, next) {
  const ip = req.ip || req.socket.remoteAddress;
  if (ip) {
    req.query.requestIp = ip;
  } else {
    req.query.requestIp = "";
  }
  next();
}

module.exports = setReqIp;
