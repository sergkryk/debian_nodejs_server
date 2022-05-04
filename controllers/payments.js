const { getLastById, getAllById } = require('../models/payments')

const userPaymentsController = async (req, res) => {
  if (req.query.view === 'last') {
    const data = await getLastById(req.params.userId);
    res.send(data);
    return;
  }
  const data = await getAllById(req.params.userId);
  res.send(data);
}

module.exports = 
{
  userPaymentsController,
};
