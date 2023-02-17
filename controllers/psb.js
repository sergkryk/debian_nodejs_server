const xml = require("xml");

const codes = require("../config/resultCodes.js");
const fetchUid = require("../models/uid.js");
const fetchName = require("../models/psb_fio.js");

class QueryController {
  constructor(args) {
    for (let key in args) {
      this[key] = args[key];
    }
    this.resultCode = codes.other;
    this.comment = "";
    this.fio = "";
  }
  async setFio() {
    if (this.uid) {
      const { fio } = await fetchName(this.uid);
      this.fio = fio;
    }
  }
  getCheckXmlResponse() {
    return xml(
      {
        Response: [
          { TransactionId: this.TransactionId },
          { ResultCode: this.resultCode },
          { Fields: [{ field1: [{ _attr: { name1: "name1" } }, this.fio] }] },
          { Comment: this.comment },
        ],
      },
      { declaration: true }
    );
  }
  async verifyTransactionId() {
    
  }
  async check() {
    try {
      const user = await fetchUid(this.Account);
      if (typeof user !== "object") {
        this.resultCode = codes.not_found;
        throw new Error();
      }
      for (let key in user) {
        this[key] = user[key];
      }
      await this.setFio();
      if (Number(this.disable) === 1) {
        this.resultCode = codes.acc_disabled;
        throw new Error();
      }
      this.resultCode = codes.ok;
      return this.getCheckXmlResponse();
    } catch (error) {
      console.log(error);
      return this.getCheckXmlResponse();
    }
  }
  async pay() {
    try {
      return await this.check();
    } catch (error) {
      
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
