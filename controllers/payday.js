const xmlResponse = require("../utils/xml");

const Report = require('../models/payday');

class QueryController {
  constructor(args) {
    for (let key in args) {
      this[key] = args[key];
    }
  }
  async response() {
    try {
      this.items = await Report.find(this.CheckDateBegin, this.CheckDateEnd, this.providerId);
      if (this.items.length > 0) {
        console.log(...this.items);
        return xmlResponse("payday", this.items);
      }
      throw new Error('Not found!')
    } catch (error) {
      return xmlResponse("payday", '');
    }
  }
}

async function init(req, res) {
  const controller = new QueryController(req.query);
  const data = await controller.response();
  res.set("Content-Type", "text/xml");
  res.send(data);
  return;
}

module.exports = init;
