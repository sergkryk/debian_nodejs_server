const Model = require('../models/cid');

module.exports = class {
  constructor() {

  }
  static async getById(req, res) {
    try {
      const id = req.auth.uid;
      const cid = await Model.fetchById(id);
      res.status(200).json(cid);  
    } 
    catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
  static async getAll(req, res) {
    try {
      const cids = await Model.fetchAll();
      res.status(200).json(cids);
    } catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
  static async reset(req, res) {
    try {
      const ip = req.ip;
      const id = req.auth.uid;
      await Model.reset(id, ip);
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
}
