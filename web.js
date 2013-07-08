var express = require('express');

var fs = require('fs');
var infile = "index.html"
var buf = new Buffer('test');

var app = express.createServer(express.logger());

fs.readFileSync(infile, buf);
var file_data = JSON.stringify(buf);

app.get('/', function(request, response) {
//  response.send('Hello World 2!');
    response.send(file_data);
//	response.send('Hello');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
