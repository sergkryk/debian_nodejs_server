const Billing = require('../models/billing');

const billingController = async (req, res) => {
  const billing = new Billing(req.params.userId);
  const data = await billing.fetchPrevFee();
  res.send(data);
}

const prevFeeController = async (req, res) => {
  const billing = new Billing(req.params.userId);
  const data = await billing.fetchPrevFee();
  res.send(data);
}

const prevPayController = async (req, res) => {
  const billing = new Billing(req.params.userId);
  const data = await billing.fetchPrevPay();
  res.send(data);
}

module.exports = { prevFeeController, prevPayController, billingController };