const { fetchUser, fetchCid, resetCid } = require('../models/user');
 
const userDetailsController = async (req, res) => {
  const result = await fetchUser(req.auth.uid)
  res.send(result);
};

const userCidController = async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip);
  const result = await fetchCid(req.auth.uid)
  res.send(result);
};

const userResetCidController = async (req, res) => {
  const result = await resetCid(req.auth.uid)
  res.send(result);
};



module.exports = { userDetailsController, userCidController, userResetCidController };
