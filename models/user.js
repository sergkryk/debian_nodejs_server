// const db = require('../utils/database');

// const fetchUserInfo = async (id) => {
//   const userLogin = db.execute(`SELECT * FROM users WHERE uid = ${id}`);
//   const userPersonalData = db.execute(`SELECT * FROM users_pi WHERE uid = ${id}`);

//   const receivedData = await Promise.all([userLogin, userPersonalData]);
//   console.log(receivedData[0][0][0]);
//   console.log(receivedData[1][0][0]);

//   return JSON.stringify(receivedData[1][0][0]);
// }

// module.exports = fetchUserInfo;
