const xml = require("xml");

function xmlResponse(code, comment) {
  return xml(
    { response: [{ ResultCode: `${code}` }, { Comment: `${comment}` }] },
    { declaration: true }
  );
}  

module.exports = xmlResponse;
