const xmlResponse = require('../utils/xml.js');

function verifyReportReq(req, res, next) {
  const regExp = new RegExp(/^\d{14}$/);
  const { CheckDateBegin, CheckDateEnd } = req.query;
  if (regExp.test(CheckDateBegin) && regExp.test(CheckDateEnd)) {
    next();
  } else {
    res.set("Content-Type", "text/xml");
    res.send(xmlResponse(3, "Check your queries format!" ));
  }
}

module.exports = verifyReportReq;
