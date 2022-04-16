const express = require('express');

const usersRouter = require('./routes/users');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/users', usersRouter);

app.use((req, res) => {
  const error = new Error('Not found');
  error.status = 404;
  res.status(error.status || 500).json({
    message: error.message
  })
})

app.listen(9000);