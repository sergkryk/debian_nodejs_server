const xml = require("xml");

const Report = require('../models/psb_report');

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
    try {
      this.items = await Report.find(this.CheckDateBegin, this.CheckDateEnd, this.requestIp);
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
