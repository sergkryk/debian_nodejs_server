const CardModel = require('../models/cards');
// const Actions = require('../models/actions');

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
      const { serial, pin } = req.body;
      res.status(200).json({serial, pin})
      // const ip = req.ip;
      // const id = req.auth.uid;
      // await checkPrevious(id, previous);
      // checkCandidate(candidate);
      // checkConfirmed(candidate, confirmed);
      // await checkPasswordDate(id);
      // await Model.update(id, ip, candidate);
      // res.status(200).json({message: 'Данные успешно сохранены'});
    } catch (error) {
      // console.log(error);
      // res.status(400).json({
        // message: error.message,
      // });
    }
  }
}
