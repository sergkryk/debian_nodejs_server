var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

app.get('/', function(req, res) {
    res.send("Hello World!");
});

server.listen(3000);
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
