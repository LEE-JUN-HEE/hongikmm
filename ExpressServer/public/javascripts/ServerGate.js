var express = require('express');
var router = express.Router();
var packet = require('./Common/packet.js');


router.get('/testUserInfo', function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    
    //DB 매니저로부터 받는 함수 추가 예정
    var json = JSON.stringify(packet.Res_Login);
    res.end(json);
});

router.get('/' + packet.type.Signin, function (req, res) {
    
    console.log(req.method);
    if (req.method == "POST") {
        req.on('data', function (req, res){
            console.log(req.body);
            //JSON.parse(req.body);
            res.end(req.body);
        });
    }
});

router.get('/' + packet.type.Login, function (req, res) {
    
});


module.exports = router;
