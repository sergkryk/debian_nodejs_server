const { User } = require('../models/info');
 
const userInfoController = async (req, res) => {
  const user = new User(req.params.userId)
  const all = await user.getAll();
  res.send(all);
};

module.exports = { userInfoController };
