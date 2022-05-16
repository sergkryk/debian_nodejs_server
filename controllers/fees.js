const feesModel = require('../models/fees');

const allFeesController = async (req, res) => {
  const orderby = req.query.orderby ? req.query.orderby : undefined;
  const rows = req.query.rows ? req.query.rows : undefined;
  
  const data = await feesModel.fetchAllFees(orderby, rows);
  res.send(data);
}

const userFeesController = async (req, res) => {
  const userId = req.params.userId;
  const orderby = req.query.orderby ? req.query.orderby : undefined;
  const rows = req.query.rows ? req.query.rows : undefined;
  
  const data = await feesModel.fetchUserFees(userId, orderby, rows);
  res.send(data);
}

const nextFeeController = async (req, res) => {
  const userId = req.params.userId;
  
  const data = await feesModel.fetchNextFee(userId);
  res.send(data);
}

module.exports = { allFeesController, userFeesController, nextFeeController };
