var express = require('express');
var router = express.Router();
var packet = require('./Common/packet.js');
var debug = require('debug')('ExpressServer');


router.get('/testUserInfo', function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    //DB 매니저로부터 받는 함수 추가 예정
    var json = JSON.stringify(packet.Res_Login);
    res.end(json);
});

router.post('/' + packet.type.Signin, function (req, res) {
    //debug('singin try : ' + req.body.UniqueID);

    res.writeHead(200, { "Content-Type": "application/json" });
    //DB 조회 후 없으면 가입 로직, 있으면 로그인 로직
    var Res = packet.Res_Singin;
    Res.ErrorNum = packet.ErrorNum.Success;

    res.end(JSON.stringify(Res));
});

router.get('/' + packet.type.Login, function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
});


module.exports = router;
