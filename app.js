const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}));
app.get('/', function(req, res) {
  res.send('<h1>Hi there!</h1>')
})


app.listen(3000);



// const db = require('./utils/database');
// const fetchUser = require('./models/user')


// db.execute('SELECT password, CONVERT(DECODE(password, \'abills345678901234490137\') USING utf8) FROM users WHERE id = \'admin_kryk\';')
//   .then((result) => {
//       console.log(result[0][0]);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const app = express();
// const server = http.createServer(app);

// app.get('/', function (req, res) {
//   console.log(req);
//   fetchUser(196).then((data) => {
//     res.send(data)
//   })
// });

// server.listen(3000, 'localhost');
// server.on('listening', () => {
//   console.log(`Server started on port ${server.address().port} at ${server.address().address}`);
// });
