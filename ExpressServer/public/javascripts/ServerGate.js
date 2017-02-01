var express = require('express');
var router = express.Router();
var packet = require('./Common/packet.js');


router.get('/testUserInfo', function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    var json = JSON.stringify(packet.Res_Login);
    res.end(json);
});

router.get('/Login', function (req, res) {
    
});

router.get('/Logout', function (req, res) {
    
});

router.get('/SignIn', function (req, res) {
    
});



module.exports = router;
