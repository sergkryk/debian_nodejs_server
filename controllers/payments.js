const { fetchLastUserPayments, fetchAllUserPayments } = require('../models/payments')

const userPaymentsController = async (req, res) => {
  if (req.query.view === 'last') {
    const data = await fetchLastUserPayments(req.params.userId);
    res.send(data);
    return;
  }
  const data = await fetchAllUserPayments(req.params.userId);
  res.send(data);
}

module.exports = 
{
  userPaymentsController,
};
