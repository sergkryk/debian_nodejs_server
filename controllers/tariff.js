const tariffModel = require('../models/tariff');

const allTariffController = async (req, res) => {
  const data = await tariffModel.fetchAll()
  res.send(data);
}

const userTariffController = async (req, res) => {
  try {
    const data = await tariffModel.fetchUserTariff(req.params.userId)
    res.send(data);
  }
  catch {
    res.status(404).send('Not found');
  }
}

module.exports = {
  allTariffController,
  userTariffController,
};
