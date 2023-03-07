const xml = require("xml");

function xmlResponse(code = "", comment = "") {
  return xml(
    { response: [{ ResultCode: `${code}` }, { Comment: `${comment}` }] },
    { declaration: true }
  );
}

function sendXmlResponse(type, opt) {
  const responses = {
    check: {
      Response: [
        { TransactionId: opt.TransactionId },
        { ResultCode: opt.resultCode },
        {
          Fields: [{ field1: [{ _attr: { name: "name" } }, opt.user.fio] }],
        },
      ],
    },
    pay: {
      Response: [
        { TransactionId: opt.TransactionId },
        { TransactionExt: opt.TransactionExt },
        { Amount: opt.Amount },
        { ResultCode: opt.resultCode },
        { Comment: opt.comment },
      ],
    },
    cancel: {
      Response: [
        { TransactionId: opt.TransactionId },
        { TransactionExt: opt.transaction.id },
        { Amount: opt.Amount },
        { ResultCode: opt.resultCode },
        { Comment: opt.comment },
      ],
    },
    error: {
      Response: [
        { ResultCode: `${opt.code || ""}` },
        { Comment: `${comment || ""}` },
      ],
    },
  };
  return xml(responses[type], { declaration: true });
}

module.exports = xmlResponse;
