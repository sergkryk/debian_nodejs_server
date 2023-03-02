const express = require("express");
const { exec } = require('child_process');

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
// app.use(express.static('static'));
// app.use(reqVerification)
app.use(setReqIp);

app.use("/psb", psbRouter);
app.use("/paydayreport", psbReportRouter);
app.use("/postoffice", postOfficeRouter);
app.use("/dealer", dealerRouter);

// // http сервер
app.listen(PORT, INTERFACE, () => {
  console.log(`The server started on ${INTERFACE} port ${PORT}`);
  // main();
});

// https сервер
// const server = https.createServer(options, app);
// server.listen(PORT, INTERFACE, () => {
  // console.log(`The server started on ${INTERFACE} port ${PORT}`);
// });
