const { fetchUser } = require('../models/user');
 
const userDetailsController = async (req, res) => {
  const result = await fetchUser(req.auth.uid)
  res.send(result);
};

module.exports = { userDetailsController };
