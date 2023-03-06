const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

// https сервер
// const https = require("https");
// const fs = require("fs");

// middleware
const setReqIp = require("./middleware/setReqIp");

//routes
const psbRouter = require("./routes/psb");
const psbReportRouter = require("./routes/psb_report");
const postOfficeRouter = require("./routes/postoffice");
const dealerRouter = require("./routes/dealer");
const webPayRouter = require("./routes/webPay");
const loginRouter = require("./routes/login");

const main = require("./config/test_post_payment");

// const PORT = 8443;
// const INTERFACE = "195.158.222.116";
const PORT = 3000;
const INTERFACE = "127.0.0.1";

// https сервер
// const hskey = fs.readFileSync("./sslcert/privkey.pem");
// const hscert = fs.readFileSync("./sslcert/fullchain.pem");
// const options = {
// key: hskey,
// cert: hscert,
// };

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(setReqIp);
// app.use(reqVerification)

// ROUTES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.use("/login", loginRouter);
app.use("/webpay", webPayRouter);
app.use("/psb", psbRouter);
app.use("/paydayreport", psbReportRouter);
app.use("/postoffice", postOfficeRouter);
app.use("/dealer", dealerRouter);

app.use("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});
// END OF ROUTES +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// // http сервер
app.listen(PORT, INTERFACE, () => {
  console.log(`The server started on ${INTERFACE} port ${PORT}`);
  // tempPostPaymentProscessing();
});

// https сервер
// const server = https.createServer(options, app);
// server.listen(PORT, INTERFACE, () => {
// console.log(`The server started on ${INTERFACE} port ${PORT}`);
// });
