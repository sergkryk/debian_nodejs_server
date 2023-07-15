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
const authRouter = require("./routes/auth");
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const setReqIp = require("./middleware/requestIp");

// переменные для порта и адреса для expressjs
// const PORT = 8443;
// const INTERFACE = "195.158.222.116";
const PORT = 3001;
const INTERFACE = "127.0.0.1";
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// https сервер конфигурация
// const hskey = fs.readFileSync("/etc/letsencrypt/live/chernuhino.online/privkey.pem");
// const hscert = fs.readFileSync("/etc/letsencrypt/live/chernuhino.online/fullchain.pem");
// const options = {
// key: hskey,
// cert: hscert,
// };
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function corsResolver(req, res, next) {
  // Website you wish to allow to connect
  // running front-end application on port 3000
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
}
// создаю веб-сервер и подключаю миддлеваре >>>>>>>>>>>>>>
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(setReqIp);
// app.use(corsResolver)
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Описываю маршруты >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.use("/auth", authRouter);
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
