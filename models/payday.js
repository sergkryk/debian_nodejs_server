const xml = require("xml");
const dbQuery = require("../utils/database");

function getXml(item) {
  const result = [];
  for (let key in item) {
    if (key === "Account") {
      item[key] = item[key].slice(item[key].length - 4, item[key].length);
    }
    result.push({ [key]: item[key] });
  }
  return {
    Payment: result,
  };
}

async function find(start, end, aid) {
  const data = await dbQuery(
    `SELECT p.ext_id as TransactionId, u.id as Account, p.dsc as TransactionDate, p.sum as Amount FROM payments p INNER JOIN users u ON u.uid = p.uid WHERE p.aid = ${aid} AND date BETWEEN TIMESTAMP(${start}) AND TIMESTAMP(${end})`
  );
  if (data?.length) {
    const xmlItems = [];
    data.forEach((item) => {
      xmlItems.push(getXml(item));
    });
    return xmlItems;
  } else {
    return [getXml(data)];
  }
}

module.exports = { find };
