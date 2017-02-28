var express = require('express');
var router = express.Router();
var packet = require('./Common/packet.js');
var debug = require('debug')('ExpressServer');

router.get('/testUserInfo', function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
	console.log(packet.type.SignIn);
	//var Type = JSON.parse(packet.type);
    //DB 매니저로부터 받는 함수 추가 예정
    var json = JSON.stringify(packet.type);
    res.end(json);
});

router.post('/testUserInfo', function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
	console.log(packet.type.SignIn);
	//var Type = JSON.parse(packet.type);
    //DB 매니저로부터 받는 함수 추가 예정
    var json = JSON.stringify(packet.type);
    res.end(json);
});


router.post('/' + packet.type.SignIn, function (req, res) {
	res.writeHead(200, { "Content-Type": "application/json" });
	console.log(packet.type.SignIn);
	//var Type = JSON.parse(packet.type);
    //DB 매니저로부터 받는 함수 추가 예정
    var json = JSON.stringify(packet.type);
    res.end(json);
});

router.post('/' + packet.type.Login, function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
});


module.exports = router;
