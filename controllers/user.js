const User = require('../models/user');
 
const userController = async (req, res) => {
  const user = new User(req.params.userId)
  const all = await user.fetchUser();
  res.send(all);
};

module.exports = userController;
