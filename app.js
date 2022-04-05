var express = require('express');
var http = require('http');
var os = require('os');

console.log(os.networkInterfaces());

var app = express();
var server = http.createServer(app);

app.get('/', function(req, res) {
    console.log('hello');	
    res.send("Hello World!");
});

server.listen(3000, '192.168.88.248');
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
