const xml = require("xml");

const codes = require("../config/citypayResponseCodes.js");
const xmlResponse = require("../utils/xml.js");
const errorHandler = require("../utils/errorHandler.js");
const messages = require("../utils/sms");
const messageTemplates = require("../utils/messageTemplates.js");

// модели для работы с базой данных
const User = require("../models/users.js");
const UserPi = require("../models/users_pi.js");
const Bills = require("../models/bills.js");
const Pays = require("../models/payments.js");
const Actions = require("../models/admin_actions.js");


class QueryController {
  constructor(args) {
    for (let key in args) {
      this[key] = args[key];
    }
  }
  static async initialize(args) {
    const { uid = "", disable = "" } = await User.fetchByLogin(
      args.Account
    );
    if (!uid) {
      errorHandler({ code: codes.not_found });
    }
    if (disable === 1) {
      errorHandler({ code: codes.acc_disabled });
    }

    let transaction = await Pays.fetchByExId(args.TransactionId);
    if (transaction.hasOwnProperty("id") && args.QueryType !== "cancel") {
      errorHandler({ code: codes.not_finished });
    }
    if (!transaction.hasOwnProperty("id") && args.QueryType === "cancel") {
      errorHandler({ code: codes.not_found });
    }
    args.transaction = transaction;
    let { fio = "", phone = "" } = await UserPi.fetchByUid(uid);
    args.resultCode = codes.other;
    args.user = { uid, disable, fio, phone };
    return new QueryController(args);
  }
  async delPaymentRecord() {
    const response = await Pays.removePay(this.TransactionId);
    if (!response.hasOwnProperty("affectedRows")) {
      errorHandler({ code: codes.other });
    }
  }
  async addPaymentRecord() {
    const response = await Pays.addPay(
      this.user.uid,
      this.TransactionId,
      this.TransactionDate,
      this.Amount,
      this.requestIp,
      this.providerId,
      this.methodId,
    );
    if (response.hasOwnProperty("insertId")) {
      this.TransactionExt = response.insertId;
      return;
    }
    errorHandler({ code: codes.other });
  }
  async getUserDeposit() {
    let { deposit } = await Bills.fetchByUid(this.user.uid);
    if (!typeof deposit === "number") {
      errorHandler({ code: codes.other });
    } else {
      this.user.deposit = deposit;
    }
  }
  async updateUserDeposit() {
    const response = await Bills.update(this.user.uid, this.user.deposit);
    let { changeRows = "", warningStatus = "" } = response;
    if (changeRows !== 1 && warningStatus !== 0) {
      errorHandler({ code: codes.other });
    }
  }
  async informUserViaSms() {
    messages.single({
      number: this.user.phone,
      message: messageTemplates.paid(
        this.Account,
        this.Amount,
        this.user.deposit
      ),
      // isTest: false,
    });
  }
  async addActionsRecord() {
    const response = await Actions.logAction(
      this.user.uid,
      this.TransactionId,
      this.requestIp,
      this.providerId
    );
  }
  onSuccess() {
    this.resultCode = codes.ok;
    return xmlResponse(this.QueryType, this)
  }
  async check() {
    return this.onSuccess()
  }
  async pay() {
    await this.getUserDeposit();
    this.user.deposit = Number(this.user.deposit) + Number(this.Amount);
    await this.addPaymentRecord();
    await this.updateUserDeposit();
    await this.informUserViaSms();
    return this.onSuccess()
  }
  async cancel() {
    if (this.transaction.sum !== Number(this.Amount) || this.user.uid !== this.transaction.uid) {
      errorHandler({code: codes.not_found})
    }
    await this.getUserDeposit();
    this.user.deposit =
      Number(this.user.deposit) - Number(this.transaction.sum);
    await this.delPaymentRecord();
    await this.updateUserDeposit();
    await this.addActionsRecord();
    return this.onSuccess()
  }
}

async function init(req, res) {
  res.set("Content-Type", "text/xml");
  try {
    const controller = await QueryController.initialize(req.query);
    const data = await controller[req.query.QueryType]();
    res.send(data);
    return;
  } catch (error) {
    res.send(
      xmlResponse("error", { code: error.code })
    );
    console.log(error.message);
  }
}

module.exports = init;
