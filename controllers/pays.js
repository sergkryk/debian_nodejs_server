const PaysModel = require('../models/pays');

const allPaysController = async (req, res) => {
  const orderby = req.query.orderby ? req.query.orderby : undefined;
  const rows = req.query.rows ? req.query.rows : undefined;
  
  const data = await PaysModel.fetchAll(orderby, rows);
  res.send(data);
}

const userPaysController = async (req, res) => {
  const userId = req.params.userId;
  const orderby = req.query.orderby ? req.query.orderby : undefined;
  const rows = req.query.rows ? req.query.rows : undefined;
  try {
    const data = await PaysModel.fetchPaysByUser(userId, orderby, rows);
    res.send(data);
  }
  catch {
    res.status('404').send('Not found');
  }
}

module.exports = { allPaysController, userPaysController };
