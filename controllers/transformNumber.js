const pool = require("./utils/db");

const exp = /072\d{7}/;

function string(arr) {
  let result = '';
  arr.forEach((element) => {
    if (element.length > 0) {
      result = `${result} ${element.trim()}`
    }
  });
  return result;
}

async function fetchData() {
  const response = await pool.execute(
    `SELECT uid, phone, comments FROM users_pi WHERE comments LIKE '%072%'`
  );

  if (response && response.length > 0) {
    const data = response[0];
    data.forEach(async (el) => {
      const phone = el.comments.match(exp);
      const uid = el.uid;
      const comment = el.comments.split(exp).toString().split(",");
      await pool.execute(`UPDATE users_pi SET phone = RIGHT(${phone}, 9) WHERE uid = ${uid}`);
      await pool.execute(`UPDATE users_pi SET comments = '${string(comment)}' WHERE uid = ${uid}`);
    });
    console.log("done");
  }
}

module.exports = fetchData;
