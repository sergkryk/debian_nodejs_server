const tariffModel = require('../models/tariff');

const allTariffController = async (req, res) => {
  const data = await tariffModel.fetchAll()
  res.send(data);
}

const userTariffController = async (req, res) => {
  try {
    const keys = req.query.keys ? req.query.keys : undefined;
    const data = await tariffModel.fetchUserTariff(keys, req.params.tariffId)
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
