const express = require('express');
const cors = require('cors');

const port = 9000;
const interface = 'localhost';

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

app.listen(port, interface, () => {
  console.log(`The server started on ${interface} port ${port}`);
});