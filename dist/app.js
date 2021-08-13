var http   = require('http'),
    static = require('node-static');

const PORT = process.env.PORT || 3000;

var file = new static.Server('./public', {cache: 2592000});

http.createServer((req, res) => {
  req.addListener('end', function () {
    file.serve(req, res);
  }).resume();
}).listen(PORT);

console.log("listening on port " + PORT);
