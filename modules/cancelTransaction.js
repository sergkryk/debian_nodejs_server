const PayModel = require("../models/payments");
const BillsModel = require("../models/bills");
const AdminActionsModel = require("../models/admin_actions");

async function cancelTransaction(opt) {
  const { id, sum, uid, aid, ip } = opt;
  const transaction = await PayModel.fetchByExId(id)

  if (Number(sum) === Number(transaction.sum) && Number(uid) === Number(transaction.uid) && Number(aid) === Number(transaction.aid)) {
    const { deposit } = await BillsModel.fetchByUid(uid);
    const updated = Number(deposit) - Number(sum);
    await BillsModel.update(uid, updated);
    await PayModel.removePay(id);
    await AdminActionsModel.logAction(uid, transaction.id, ip, aid);
    return {
      status: 'success',
      uid,
      id: transaction.id,
    };
  }
}

module.exports = cancelTransaction;

