const xml = require("xml");

const codes = require("../config/resultCodes.js");
const fetchDisable = require("../models/psb_disable.js");
const fetchTransaction = require("../models/psb_transaction.js");
const fetchName = require("../models/psb_fio.js");
const fetchUid = require("../models/psb_uid.js");
const sendPay = require("../models/psb_pay.js");

class QueryController {
  constructor(args) {
    for (let key in args) {
      this[key] = args[key];
    }
    this.resultCode = codes.other;
    this.comment = "";
    this.fio = "";
  }
  async sendTransaction() {
    await sendPay(this.uid, this.TransactionId, this.TransactionDate, this.Amount, '195.158.222.10')
  }
  async verifyDisable() {
    this.disable = await fetchDisable(this.uid);
    if (this.disable === 1) {
      this.resultCode = codes.acc_disabled;
      throw new Error();
    }
  }
  async verifyTransaction() {
    this.isUnique = await fetchTransaction(this.TransactionId);
    if (!this.isUnique) {
      this.resultCode = codes.not_finished;
      throw new Error();
    }
  }
  async verifyUid() {
    const data = await fetchUid(this.Account);
    if (typeof data !== "object") {
      this.resultCode = codes.not_found;
      throw new Error();
    }
    this.uid = data.uid;
  }
  async fetchFio() {
    const data = await fetchName(this.uid);
    this.fio = data.fio;
  }
  getCheckXmlResponse() {
    return xml(
      {
        Response: [
          { TransactionId: this.TransactionId },
          { ResultCode: this.resultCode },
          { Fields: [{ field1: [{ _attr: { name: "name" } }, this.fio] }] },
          { Comment: this.comment },
          { Uid: this.uid },
        ],
      },
      { declaration: true }
    );
  }
  async check() {
    try {
      await this.verifyUid();
      await this.fetchFio();
      await this.verifyDisable();
      this.resultCode = codes.ok;
      return this.getCheckXmlResponse();
    } catch (error) {
      console.log(error);
      return this.getCheckXmlResponse();
    }
  }
  async pay() {
    try {
      await this.verifyUid();
      await this.fetchFio();
      await this.verifyDisable();
      await this.verifyTransaction();
      await this.sendTransaction();
      
      this.resultCode = codes.ok;
      return this.getCheckXmlResponse();
    } catch (error) {
      console.log(error);
      return this.getCheckXmlResponse();
    }
  }
}

async function init(req, res, next) {
  const controller = new QueryController(req.query);
  const data = await controller[req.query.QueryType]();
  res.set("Content-Type", "text/xml");
  res.send(data);
  return;
}

module.exports = init;
