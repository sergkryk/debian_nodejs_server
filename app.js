const express = require("express");

const PORT = 3000;
const INTERFACE = "127.0.0.1";

const psbRouter = require("./routes/psb");


const app = express();
// app.use(express.static('static'));
// app.use(reqVerification)

app.use('/psb', psbRouter)

app.listen(PORT, INTERFACE, () => {
  console.log(`The server started on ${INTERFACE} port ${PORT}`);
});
