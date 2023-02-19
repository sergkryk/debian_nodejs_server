const xml = require("xml");

class QueryController {
  constructor(args) {
    for (let key in args) {
      this[key] = args[key];
    }
  }

  sendXmlResponse() {
    return xml(
      {
        Response: [
          { TransactionId: '' },
          { TransactionExt: '' },
          { Amount: '' },
          { ResultCode: '' },
          { Comment: '' },
        ],
      },
      { declaration: true }
    );
  }
  async response() {
    try {
      return this.sendXmlResponse();
    } catch (error) {

    }
  }
}

async function init(req, res, next) {
  const controller = new QueryController();
  const data = await controller.response();
  res.set("Content-Type", "text/xml");
  res.send(data);
  return;
}

module.exports = init;
