const xml = require("xml");

const codes = require("../config/resultCodes.js");
const COUNTRY_CODE = '7959';

const isUnique = require("../models/psb_unique.js");
const sendPay = require("../models/psb_payment.js");
const cancelPay = require("../models/psb_payment_cancel.js");
const findPay = require("../models/psb_payment_find.js");
const Bill = require("../models/psb_bills.js");
const Actions = require("../models/psb_admin_actions.js");

const UserModel = require("../models/user.js");
const UserPiModel = require("../models/userPi.js");
const BillsModel = require("../models/bills.js");

const validator = require("../utils/validators.js");
const messages = require("../utils/sms");
const messageTemplates = require("../utils/messageTemplates.js");

class QueryController {
  constructor(args) {
    for (let key in args) {
      this[key] = args[key];
    }
    this.resultCode = codes.other;
    this.comment = "";
    this.fio = "";
    this.isPaid = true;
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
      this.providerId
    );
  }
  async findTransaction() {
    return await findPay(this.uid, this.TransactionId, this.Amount);
  }
  async verifyDisable() {
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
    try {
      let { uid, disable } = await UserModel.fetchByLogin(this.Account);
      Object.assign(this, { uid, disable });
    } catch (error) {
      this.resultCode = codes.not_found;
    }
  }
  async fetchDeposit() {
    let { deposit } = await BillsModel.fetchByUid(this.uid);
    Object.assign(this, { deposit });
  }
  async fetchPi() {
    let { fio, phone } = await UserPiModel.fetchByUid(this.uid);
    Object.assign(this, { fio, phone });
  }
  async addSum() {
    this.isPaid = await Bill.add(this.uid, this.Amount);
  }
  async substractSum() {
    this.isSubstracted = await Bill.substract(this.uid, this.Amount);
  }
  async logTransactionCancel() {
    await Actions.recordCancelPayment(
      this.uid,
      this.TransactionId,
      this.address
    );
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
      // await this.sendTransaction();
      // await this.addSum();
      await this.fetchDeposit();
      // console.log(this);
      // console.log(validator.validatePhone(this.phone));
      if (this.isPaid) {
        if (validator.validatePhone(this.phone)) {
          messages.single({
            number: `${COUNTRY_CODE}${this.phone}`,
            message: messageTemplates.paid(this.Account, this.Amount, this.deposit),
          })
        }
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
