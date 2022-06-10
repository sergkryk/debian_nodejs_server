const Model = require('../models/stats');

function calcEndTime(start, duration) {
  const end = start + (duration * 1000);
  return end;
}

module.exports = class {
  static async getById(req, res) {
    try {
      const id = req.auth.uid;
      const stats = await Model.fetchById(id);
      stats.forEach((el) => {
        el.end = calcEndTime(el.start, el.duration)
      })
      res.status(200).json(stats);
    } 
    catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
  static async getByDates(req, res) {
    try {
      const id = req.auth.uid;
      const {start, end} = req.body;
      const stats = await Model.fetchById(id, start, end);
      stats.forEach((el) => {
        el.end = calcEndTime(el.start, el.duration)
      })
      res.status(200).json(stats);
    } 
    catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
}
