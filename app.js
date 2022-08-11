const express = require('express')
const cors = require('cors')

// https сервер
const https = require('https')
const fs = require('fs')
//

const PORT = 9000
const INTERFACE = '10.0.0.7'

const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const feesRouter = require('./routes/fees')
const paysRouter = require('./routes/pays')
const tariffRouter = require('./routes/tariff')
const loginRouter = require('./routes/login')

// https сервер
const hskey = fs.readFileSync('privkey.pem')
const hscert = fs.readFileSync('fullchain.pm')
const options = {
  key: hskey,
  cert: hscert
};
//

const app = express()
app.use(cors({
  origin: `https://asknet.online`,
  credentials: true,
}));

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

// http сервер
// app.listen(PORT, INTERFACE, () => {
//   console.log(`The server started on ${INTERFACE} port ${PORT}`)
// });

// https сервер
const server = https.createServer(options, app);
server.listen(PORT, INTERFACE, () => {
  console.log(`The server started on ${INTERFACE} port ${PORT}`)
})