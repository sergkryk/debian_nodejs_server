const express = require('express');
const cors = require('cors');

const PORT = 9000;
const INTERFACE = 'localhost';

const userRouter = require('./routes/user');
const feesRouter = require('./routes/fees');
const paysRouter = require('./routes/pays');
const tariffRouter = require('./routes/tariff');

const app = express();
app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/user', userRouter);
app.use('/tariff', tariffRouter);
app.use('/fees', feesRouter);
app.use('/pays', paysRouter);

app.use((req, res) => {
  const error = new Error('Not found');
  error.status = 404;
  res.status(error.status || 500).json({
    message: error.message
  })
})

app.listen(PORT, INTERFACE, () => {
  console.log(`The server started on ${INTERFACE} port ${PORT}`);
});