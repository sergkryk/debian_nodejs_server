const BillsModel = require("../models/bills");
const PaymentsModel = require("../models/payments");
const { payToLanbilling } = require("../modules/lanbilling");

async function addTransaction(opt) {
  const { aid, ip, uid, sum, payType = 0, transactionId = '', transactionDate = '', lanbilling = {} } = opt;
  // записываю платёж в таблицу payments
  const paymentRecordRequest = await PaymentsModel.addPay(
    uid,
    transactionId,
    transactionDate,
    sum,
    ip,
    aid,
    payType
  );
  // получаю запись о платеже из таблицы payments
  const paymentRecord = await PaymentsModel.fetchById(
    paymentRecordRequest.insertId
  );
  // сравниваю данные с записью в таблице
  if (
    Number(paymentRecord.sum) !== Number(sum) ||
    Number(paymentRecord.uid) !== Number(uid)
  ) {
    throw new Error("Failed to log payment!");
  }
  // обновляю депозит пользователя
  await BillsModel.update(
    uid,
    Number(paymentRecord.sum) + Number(paymentRecord.last_deposit)
  );
  // сравниваю депозит в таблице с отправленными данными для перестраховки
  const { deposit } = await BillsModel.fetchByUid(uid);
  if (Number(deposit) !== Number(paymentRecord.sum) + Number(paymentRecord.last_deposit)) {
    throw new Error("Failed to update deposit!");
  }
  // отправляю платёж в lanbilling
  const comment = transactionId ? `Платёж с внешним идентификатором ${transactionId} от ${transactionDate}` : 'Оплата через дилера';
  await payToLanbilling(lanbilling.account, lanbilling.amount, paymentRecordRequest.insertId, lanbilling.aid, comment);
  // возвращаю ответ
  return {
    uid,
    sum,
    deposit,
    paymentId: paymentRecordRequest.insertId,
    status: "success",
  };
}

module.exports = addTransaction;
