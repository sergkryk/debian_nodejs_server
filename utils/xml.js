const xml = require("xml");

const xmlResponse =  {
  check(id = '', resultCode = '', comment = '') {
    return xml(
      { response: [{ TransactionId: `${id}`}, { ResultCode: `${resultCode}` }, { Comment: `${comment}` }] },
      { declaration: true }
    );
  },
  pay() {
    return xml(
      { response: [{ TransactionId: ""}, { TransactionExt: ""}, { Amount: ""}, { ResultCode: "" }, { Comment: "" }] },
      { declaration: true }
    );
  },
  cancel() {
    return xml(
      { response: [{ TransactionId: ""}, { RevertId: ""}, { TransactionExt: ""}, { Amount: ""}, { ResultCode: "" }, { Comment: "" }] },
      { declaration: true }
    );
  }
}

module.exports = xmlResponse;
