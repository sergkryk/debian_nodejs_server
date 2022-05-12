const { fetchUserDetails } = require('../models/user');
 
const userDetailsController = async (req, res) => {
  const result = await fetchUserDetails(req.params.userId)
  res.send(result);
};

module.exports = { userDetailsController };
