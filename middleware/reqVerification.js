const types = ["check", "pay", "cancel"];

const xmlResponse = require("../utils/xml.js");

const accRegExp = new RegExp(/^\d{4}$/);
const trRegExp = new RegExp(/^\d{1,}$/);
const dateRegExp = new RegExp(/^\d{14}$/);
const amountRegExp = new RegExp(/^\d{1,5}\.\d{2}$/);

const reqVerification = function (req, res, next) {
  try {
    const { QueryType, TransactionId, Account } = req.query;
    const isType = types.includes(QueryType);
    const isAccount = accRegExp.test(Account);
    const isTransaction = trRegExp.test(TransactionId);

    if ([isType, isAccount, isTransaction].includes(false)) {
      throw new Error();
    }
    if (QueryType === "pay") {
      const { TransactionDate, Amount } = req.query;

      const isDate = dateRegExp.test(TransactionDate);
      const isAmount = amountRegExp.test(Amount);

      if (!isDate || !isAmount) {
        throw new Error();
      }
    }
    if (QueryType === "cancel") {
      const { Amount } = req.query;

      const isAmount = amountRegExp.test(Amount);

      if (!isAmount) {
        throw new Error();
      }
    }
    next();
  } catch (error) {
    res.set("Content-Type", "text/xml");
    res.send(xmlResponse(3, "Check your query format!"));
  }
};

module.exports = reqVerification;
