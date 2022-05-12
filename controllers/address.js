const addressModel = require('../models/address');

const userAddressController = async (req, res) => {
  const userId = req.params.userId;
  const data = await addressModel.getUserAddress(userId);
  res.send(data);
}

module.exports = { userAddressController };
