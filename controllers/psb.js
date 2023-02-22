const xml = require("xml");

const codes = require("../config/resultCodes.js");

const fetchDisable = require("../models/psb_disable.js");
const isUnique = require("../models/psb_unique.js");
const fetchName = require("../models/psb_fio.js");
const fetchUid = require("../models/psb_uid.js");
const sendPay = require("../models/psb_payment.js");
const cancelPay = require("../models/psb_payment_cancel.js");
const findPay = require("../models/psb_payment_find.js");
const Bill = require("../models/psb_bills.js");
const Actions = require("../models/psb_admin_actions.js");

class QueryController {
  constructor(args) {
    for (let key in args) {
      this[key] = args[key];
    }
    this.resultCode = codes.other;
    this.comment = "";
    this.fio = "";
  }
  async cancelTransaction() {
    await cancelPay(this.TransactionId);
  }
  async sendTransaction() {
    this.payId = await sendPay(
      this.uid,
      this.TransactionId,
      this.TransactionDate,
      this.Amount,
      this.address,
      this.providerId,
    );
  }
  async findTransaction() {
    return await findPay(this.uid, this.TransactionId, this.Amount);
  }
  async verifyDisable() {
    this.disable = await fetchDisable(this.uid);
    if (this.disable === 1) {
      this.resultCode = codes.acc_disabled;
      throw new Error();
    }
  }
  async isUnique() {
    this.isUnique = await isUnique(this.TransactionId);
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
  async fetchPi() {
    const data = await fetchName(this.uid);
    this.fio = data.fio;
  }
  async addSum() {
    this.isPaid = await Bill.add(this.uid, this.Amount);
  }
  async substractSum() {
    this.isSubstracted = await Bill.substract(this.uid, this.Amount);
  }
  async logTransactionCancel() {
    await Actions.recordCancelPayment(this.uid, this.TransactionId, this.address);
  }
  sendXmlResponse() {
    const responses = {
      check: {
        Response: [
          { TransactionId: this.TransactionId },
          { ResultCode: this.resultCode },
          { Fields: [{ field1: [{ _attr: { name: "name" } }, this.fio] }] },
          { Comment: this.comment },
        ],
      },
      pay: {
        Response: [
          { TransactionId: this.TransactionId },
          { TransactionExt: this.payId },
          { Amount: this.Amount },
          { ResultCode: this.resultCode },
          { Comment: this.comment },
        ],
      },
      cancel: {
        Response: [
          { TransactionId: this.TransactionId },
          { TransactionExt: this.transactionToCancel },
          { Amount: this.Amount },
          { ResultCode: this.resultCode },
          { Comment: this.comment },
        ],
      },
    };
    return xml(responses[this.QueryType], { declaration: true });
  }
  async check() {
    try {
      await this.verifyUid();
      await this.fetchPi();
      await this.verifyDisable();
      this.resultCode = codes.ok;
      return this.sendXmlResponse();
    } catch (error) {
      console.log(error);
      return this.sendXmlResponse();
    }
  }
  async pay() {
    try {
      await this.verifyUid();
      await this.fetchPi();
      await this.verifyDisable();
      await this.isUnique();
      await this.sendTransaction();
      await this.addSum();
      if (this.isPaid) {
        this.resultCode = codes.ok;
        return this.sendXmlResponse();
      } else {
        throw new Error("Failed to process payment!");
      }
    } catch (error) {
      console.log(error);
      return this.sendXmlResponse();
    }
  }
  async cancel() {
    try {
      await this.verifyUid();
      this.transactionToCancel = await this.findTransaction();
      if (this.transactionToCancel) {
        await this.cancelTransaction();
        await this.substractSum();
        if (this.isSubstracted) {
          await this.logTransactionCancel();
          this.resultCode = codes.ok;
          return this.sendXmlResponse();
        }
      }
      throw new Error("Failed to cancel payment!");
    } catch (error) {
      this.resultCode = codes.forbidden;
      console.log(error);
      return this.sendXmlResponse();
    }
  }
}

async function init(req, res) {
  const controller = new QueryController(req.query);
  const data = await controller[req.query.QueryType]();
  res.set("Content-Type", "text/xml");
  res.send(data);
  return;
}

module.exports = init;
