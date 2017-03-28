var express = require('express');
var router = express.Router();
var packet = require('./Common/packet.js');
var debug = require('debug')('ExpressServer');
var DBManagaer = require('./db_connect_module/DatabaseManager.js');

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
    console.log(packet.type.LogIn);
    DBManagaer.UserDBConnect(req.body).then(function (Ret) {
        if (Ret.ErrorNum == packet.ErrorNum.UserTableSelectError) {
            //DB에 없을 경우 가입 진행
            console.log("Need Singin");
            //DBManagaer.UserDBConnect(req.body).then(function (Ret) {
            //});
        }
        else if (Ret.ErrorNum = packet.ErrorNum.Success) {
            //DB에 존재. 로그인 처리
            console.log("Login");
        }
    }, function (err) {
        console.log(err);
    });
	//var Type = JSON.parse(packet.type);
    //DB 매니저로부터 받는 함수 추가 예정
    var json = JSON.stringify(packet.type);
    res.end(json);
});

router.post('/' + packet.type.LogIn, function (req, res) {
    console.log("Attemt");
    DBManagaer.UserDBConnect(req.body).then(function (Ret) {
        if (Ret.ErrorNum == packet.ErrorNum.UserTableSelectError) {
            //DB에 없을 경우 가입 진행
            console.log("Need Singin");
            //DBManagaer.UserDBConnect(req.body).then(function (Ret) {
            //});
        }
        else if (Ret.ErrorNum = packet.ErrorNum.Success) {
            //DB에 존재. 로그인 처리
            console.log("Login");
        }
    }, function (err) {
        console.log(err);
    });
    var json = JSON.stringify(packet.type);
    res.end(json);
});

module.exports = router;
