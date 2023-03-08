const xml = require("xml");

const Report = require('../models/payday');

class QueryController {
  constructor(args) {
    for (let key in args) {
      this[key] = args[key];
    }
  }

  sendXmlResponse() {
    return xml(
      { Response: this.items},
      { declaration: true }
    );
  }
  async response() {
    console.log(this);
    try {
      this.items = await Report.find(this.CheckDateBegin, this.CheckDateEnd, this.providerId);
      if (this.items.length > 0) {
        return this.sendXmlResponse();
      }
      throw new Error('Not found!')
    } catch (error) {
      console.log(error);
      return this.sendXmlResponse();
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
