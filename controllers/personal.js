const Personal = require('../models/personal');

const personalController = async (req, res) => {
  const personal = new Personal(req.params.userId)
  const data = await personal.fetchUserPersonal()
  res.send(data);
}

module.exports = personalController;
