const CardModel = require('../models/cards');

module.exports = class {
  static async getById(req, res) {
    try {
      // const id = req.auth.uid;
      // const password = await Model.fetchById(id);
      // res.status(200).json(password);  
    } 
    catch (error) {
      // console.log(error);
      // res.status(404).send();
    }
  }
  static async pay(req, res) {
    try {
      const ip = req.ip;
      const { serial, pin } = req.body;
      const uid = req.auth.uid;
      const payCard = await CardModel.check({serial, pin});
      await CardModel.use(uid, payCard, ip);
      res.status(200).json(payCard)
    } catch (error) {
      res.status(200).json({
        message: error.message,
      });
    }
  }
}
