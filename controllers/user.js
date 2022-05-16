const { fetchUser } = require('../models/user');
 
const userDetailsController = async (req, res) => {
  const result = await fetchUser(req.params.userId)
  res.send(result);
};

module.exports = { userDetailsController };
