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

const addTransaction = require("../modules/addTransaction");
const cancelTransaction = require("../modules/cancelTransaction");

class QueryController {
  constructor(args) {
    for (let key in args) {
      this[key] = args[key];
    }
  }
  static async initialize(args) {
    const { uid = "", disable = "" } = await User.fetchByLogin(args.Account);
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
  async informUserViaSms() {
    messages.single({
      number: this.user.phone,
      message: messageTemplates.paid(
        this.Account,
        this.Amount,
        this.user.deposit
      ),
    });
  }
  onSuccess() {
    this.resultCode = codes.ok;
    return xmlResponse(this.QueryType, this);
  }
  async check() {
    return this.onSuccess();
  }
  async pay() {
    const query = await addTransaction({
      uid: this.user.uid,
      transactionId: this.TransactionId,
      transactionDate: this.TransactionDate,
      sum: this.Amount,
      ip: this.requestIp,
      aid: this.providerId,
      payType: this.methodId,
    });
    if (query.status === "success") {
      this.TransactionExt = query.paymentId;
      this.user.deposit = query.deposit;
      await this.informUserViaSms();
      return this.onSuccess();
    } else {
      errorHandler({ code: codes.other });
    }
  }
  async cancel() {
    const query = await cancelTransaction({
      id: this.TransactionId,
      sum: this.Amount,
      uid: this.user.uid,
      aid: this.providerId,
      ip: this.requestIp,
    });
    if (query.status === 'success') {
      return this.onSuccess()
    } else {
      errorHandler({ code: codes.other });
    }
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
    res.send(xmlResponse("error", { code: error.code }));
    console.log(error.message);
  }
}

module.exports = init;
