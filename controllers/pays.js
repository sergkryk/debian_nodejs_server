const PaysModel = require('../models/pays');

module.exports = class {
  static async getAll(req, res) {
    try {
      const data = await PaysModel.fetchAll();
      res.status(200).json(data);
    } 
    catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
  static async getByUser(req, res) {
    try {
      const userId = req.auth.uid;
      const period = req.body;
      if (!period.begin || !period.end) {
        throw new Error('Specify the period dates')
      }
      const data = await PaysModel.fetchByUser(userId, period);
      res.status(200).json(data);
    } 
    catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
}
