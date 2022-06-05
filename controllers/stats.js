const Model = require('../models/stats');

module.exports = class {
  static async getById(req, res) {
    try {
      const id = req.auth.uid;
      const stats = await Model.fetchById(id);
      res.status(200).json(stats);  
    } 
    catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
}
