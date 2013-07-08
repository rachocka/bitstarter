var express = require('express');

var fs = require('fs');
var infile = "index.html"
var buf = new Buffer(2560);

var app = express.createServer(express.logger());

buf = fs.readFileSync(infile);


app.get('/', function(request, response) {
//  response.send('Hello World 2!');
    response.send(buf.toString('utf8', 0, buffer.length));
//	response.send('Hello');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
