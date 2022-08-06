const CardModel = require('../models/cards');

module.exports = class {
  static async pay(req, res) {
    try {
      const ip = req.ip;
      const { serial, pin } = req.body;
      const uid = req.auth.uid;
      const payCard = await CardModel.check({serial, pin});
      await CardModel.use(uid, payCard, ip);
      res.status(200).json(payCard)
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}
