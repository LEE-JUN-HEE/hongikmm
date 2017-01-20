var express = require('express');
var router = express.Router();


router.get('/testUserInfo', function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    var json = JSON.stringify({
        UserID : 'HIHI', 
        Gold : '0', 
    });
    res.end(json);
});

router.get('/Login', function (req, res) {
    
});

router.get('/Logout', function (req, res) {
    
});

router.get('/SignIn', function (req, res) {
    
});



module.exports = router;
