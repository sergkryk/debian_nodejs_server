const FeesModel = require('../models/fees');

module.exports = class {
  static async getAll(req, res) {
    try {
      const data = await FeesModel.fetchAll();
      res.status(200).json(data);
    } 
    catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
  static async getById(req, res) {
    try {
      const userId = req.auth.uid;
      const data = await FeesModel.fetchByUser(userId);
      res.status(200).json(data);
    } 
    catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
  static async getLastById(req, res) {
    try {
      const userId = req.auth.uid;
      const data = await FeesModel.fetchUserLast(userId);
      res.status(200).json(data);
    } 
    catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
}
