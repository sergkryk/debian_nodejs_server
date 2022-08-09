module.exports = class {
  constructor() {

  }
  static async status(req, res) {
    try {
      res.status(200).send();  
    } 
    catch (error) {
      res.status(401).send();
    }
  }
}
