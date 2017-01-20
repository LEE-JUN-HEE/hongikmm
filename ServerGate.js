var http = require('http');

var server = http.createServer(function (req, res) {
    console.log("Conncetion On 80 port");
}).listien(80);