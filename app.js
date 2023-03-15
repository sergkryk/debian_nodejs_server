const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

// загружаю переменные из файла .env
dotenv.config();
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// импорт для https сервера
// const https = require("https");
// const fs = require("fs");
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// импортирую роутеры из модулей
const cityPayRouter = require("./routes/citypay");
const payDayRouter = require("./routes/payday");
const postOfficeRouter = require("./routes/postoffice");
const postRouter = require("./routes/post");
const dealerRouter = require("./routes/dealer");
const loginRouter = require("./routes/login");
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const setReqIp = require("./middleware/requestIp");

// переменные для порта и адреса для expressjs
// const PORT = 8443;
// const INTERFACE = "195.158.222.116";
const PORT = 3000;
const INTERFACE = "127.0.0.1";
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// https сервер конфигурация
// const hskey = fs.readFileSync("./sslcert/privkey.pem");
// const hscert = fs.readFileSync("./sslcert/fullchain.pem");
// const options = {
// key: hskey,
// cert: hscert,
// };
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// создаю веб-сервер и подключаю миддлеваре >>>>>>>>>>>>>>
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(setReqIp);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Описываю маршруты >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.use("/login", loginRouter);
app.use("/post", postRouter);
app.use("/psb", cityPayRouter);
app.use("/paydayreport", payDayRouter);
app.use("/postoffice", postOfficeRouter);
app.use("/dealer", dealerRouter);
app.use("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// запуск http сервер >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.listen(PORT, INTERFACE, () => {
  console.log(`The server started on ${INTERFACE} port ${PORT}`);
});
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// запуск https сервер >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const server = https.createServer(options, app);
// server.listen(PORT, INTERFACE, () => {
// console.log(`The server started on ${INTERFACE} port ${PORT}`);
// });
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// const query = require("./utils/database");

// (async function main() {
//   try {
//     const response = await query(
//         `INSERT INTO admin_actions (
//           actions,
//           datetime,
//           ip,
//           uid,
//           aid,
//           action_type
//         )
//         VALUES (
//           'Test',
//           NOW(),
//           INET_ATON('127.0.0.1'),
//           100,
//           5,
//           10
//         );`
//       );
//     // const response = await dbQuery(
//     //   `INSERT INTO admin_actions (
//     //     actions,
//     //     datetime,
//     //     ip,
//     //     uid,
//     //     aid,
//     //     action_type
//     //   )
//     //   VALUES (
//     //     'Transaction TEST canceled',
//     //     NOW(),
//     //     INET_ATON('127.0.0.1'),
//     //     399,
//     //     5,
//     //     2
//     //   );`
//     // );
//     console.log(response);
//   } catch (error) {
//     console.log(error.code);
//   }
// })();
