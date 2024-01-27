// const { Lanbilling } = require("./modules/lanbilling");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// const dotenv = require("dotenv");

// загружаю переменные из файла .env
// dotenv.config();
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// импорт для https сервера
const https = require("https");
const fs = require("fs");
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
const hskey = fs.readFileSync("/etc/letsencrypt/live/chernuhino.online/privkey.pem");
const hscert = fs.readFileSync("/etc/letsencrypt/live/chernuhino.online/fullchain.pem");
const options = {
key: hskey,
cert: hscert,
};
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
// app.listen(PORT, INTERFACE, () => {
//   console.log(`The server started on ${INTERFACE} port ${PORT}`);
// });
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// запуск https сервер >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const server = https.createServer(options, app);
server.listen(PORT, INTERFACE, () => {
console.log(`The server started on ${INTERFACE} port ${PORT}`);
});
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// проведение оплат в ручном режиме >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const payments = [
  // { pid: 164127, login: "user_3325", sum: 500, comment: "" },
// ];

// async function main() {
//   const Lanbill = await Lanbilling.initialize("http://10.45.0.50:34012", {
//     login: "admin",
//     pass: "vv1315vv",
//   });

//   for (let i = 0; i < payments.length; i++) {
//     const { pid, login, sum, comment } = payments[i];
//     const [uid] = await Lanbill.getAccounts(login);
//     const { agrmid } = await Lanbill.getAgreements(uid);
//     const payment = await Lanbill.pay(agrmid, sum, pid, 5, comment);
//     console.log(payment);
//   }
// }

// main();
