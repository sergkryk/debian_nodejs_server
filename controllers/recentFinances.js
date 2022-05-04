const { getRecentFinances } = require('../models/recentFinances')

const recentFinancesController = async (req, res) => {
  const data = await getRecentFinances(req.params.userId);
  res.send('data');
}

module.exports = 
{
  recentFinancesController,
};
