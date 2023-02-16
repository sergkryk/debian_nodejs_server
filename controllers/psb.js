const xml = require("xml");

class QueryController {
  constructor(args) {
    for (let key in args) {
      this[key] = args[key];
    }
  }

  check() {
    const response = xml(
      {
        response: [
          { TransactionId: `${this.TransactionId}` },
          { ResultCode: `299` },
          { Comment: `Lenina` },
        ],
      },
      { declaration: true }
    );
    return response;
  }
  pay() {}
  cancel() {}
}

function init(req, res, next) {
  const controller = new QueryController(req.query);
  const data = controller[req.query.QueryType]();
  res.set("Content-Type", "text/xml");
  res.send(data);
  return;
}

module.exports = init;
