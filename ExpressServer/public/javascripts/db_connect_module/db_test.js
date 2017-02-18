var queryMesJSON = {
     //mType: "SignIn",
     mType: "DropOut",
     UID: "testUID"
     //userID: "testID"
};
var RetJSON;
var UserDBConnect = require('./DatabaseManager.js').UserDBConnect;
/*
UserDBConnect(queryMesJSON, RetJSON, function(err, result) {
     if (err) {
     	console.log("UserDBConnect error");
     }
     console.log("!@@!#@$");
     console.log(RetJSON);
});*/

UserDBConnect(queryMesJSON, RetJSON, function(err) {
     if (err) console.log(err);
     console.log(RetJSON);
});
