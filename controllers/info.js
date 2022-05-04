const { getInfo } = require('../models/info');
 
const userInfoController = async (req, res) => {
  const data = await getInfo(req.params.userId);
  res.send(data);
};

module.exports = { userInfoController };
