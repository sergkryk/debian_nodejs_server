const types = ["check", "pay", "cancel"];

const XmlResponse = require('../utils/xml.js');

const reqVerification = function (req, res, next) {
  try {
    const { QueryType, TransactionId, Account } = req.query;
    if (!QueryType || !TransactionId || !Account) {
      throw new Error(299);
    }
    if (!types.includes(QueryType)) {
      throw new Error(299);
    }
    next();
  } catch (error) {
    res.header("Content-Type", "application/xml");
    res.status(200).send(XmlResponse.cancel());
  }
};

module.exports = reqVerification;
