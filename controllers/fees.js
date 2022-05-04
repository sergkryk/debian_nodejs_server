const { fetchLastUserFees, fetchAllUserFees } = require('../models/fees')

const userFeesController = async (req, res) => {
  if (req.query.view === 'last') {
    const data = await fetchLastUserFees(req.params.userId);
    res.send(data);
    return;
  }
  const data = await fetchAllUserFees(req.params.userId);
  res.send(data);
}

module.exports = 
{
  userFeesController,
};
