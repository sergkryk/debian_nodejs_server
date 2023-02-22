const pool = require("../utils/db");

function getXml(item) {
  const result = [];
  for (let key in item) {
    if (key === 'Account') {
      item[key] = item[key].slice(item[key].length - 4, item[key].length);
    }
    result.push({ [key]: item[key] });
  }
  return {
    Payment: result,
  };
}

async function find(start, end, ip) {
  console.log(ip);
  const data = await pool.execute(
    `SELECT p.ext_id as TransactionId, u.id as Account, p.dsc as TransactionDate, p.sum as Amount FROM payments p INNER JOIN users u ON u.uid = p.uid WHERE ip = INET_ATON('${ip}') AND date BETWEEN TIMESTAMP(${start}) AND TIMESTAMP(${end})`
  );
  if (data.length > 0) {
    const body = data[0];
    const xmlItems = [];
    body.forEach((item) => {
      xmlItems.push(getXml(item));
    });
    return xmlItems;
  }
  return "";
}

module.exports = { find };
