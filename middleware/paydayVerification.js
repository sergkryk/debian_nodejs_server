const xmlResponse = require('../utils/xml.js');

function verifyReportReq(req, res, next) {
  const regExp = new RegExp(/^\d{14}$/);
  const { CheckDateBegin, CheckDateEnd } = req.query;
  if (regExp.test(CheckDateBegin) && regExp.test(CheckDateEnd)) {
    next();
  } else {
    res.set("Content-Type", "text/xml");
    res.send(
      xmlResponse("error", { code: "3", comment: "Check your query format!" })
    );
  }
}

module.exports = verifyReportReq;
