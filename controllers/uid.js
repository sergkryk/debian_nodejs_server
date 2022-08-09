module.exports = class {
  static async get(req, res) {
    try {
      const uid = req.auth.uid;
      res.status(200).json({uid});
    } 
    catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
}
