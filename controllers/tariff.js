const Tariff = require('../models/tariff');

const tariffController = async (req, res) => {
  const tariff = new Tariff(req.params.userId)
  const data = await tariff.fetchTariff()
  res.send(data);
}

module.exports = tariffController;
