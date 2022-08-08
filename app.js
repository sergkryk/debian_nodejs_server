const express = require('express')
// const cors = require('cors')
const https = require('https')
const fs = require('fs')

const PORT = 9000
const INTERFACE = '10.0.0.7'

const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const feesRouter = require('./routes/fees')
const paysRouter = require('./routes/pays')
const tariffRouter = require('./routes/tariff')
const loginRouter = require('./routes/login')

const hskey = fs.readFileSync('asknet.api-key.pem')
const hscert = fs.readFileSync('asknet.api-cert.pem')

const options = {
  key: hskey,
  cert: hscert
};

const app = express()
// app.use(cors({
//   origin: `http://localhost:8080`,
//   credentials: true,
// }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Origin", "http://localhost:8080")
  res.header("Access-Control-Allow-Credentials", "true")
  next()
});

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/admin', adminRouter)
app.use('/user', userRouter)
app.use('/tariff', tariffRouter)
app.use('/fees', feesRouter)
app.use('/pays', paysRouter)
app.use('/login', loginRouter)

app.use((req, res) => {
  const error = new Error('Not found')
  error.status = 404
  res.status(error.status || 500).json({
    message: error.message
  })
})

// app.listen(PORT, INTERFACE, () => {
//   console.log(`The server started on ${INTERFACE} port ${PORT}`)
// });

const server = https.createServer(options, app);
server.listen(PORT, INTERFACE, () => {
  console.log(`The server started on ${INTERFACE} port ${PORT}`)
})