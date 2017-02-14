var queryMesJSON = {
     mType: "SignIn",
     UID: "testUID",
     userID: "testuserID"
};
var RetJSON;
var UserDBConnect = require('./DatabaseManager.js').UserDBConnect;

UserDBConnect(queryMesJSON, RetJSON, function(err, result) {
     if (err) {
     	console.log("UserDBConnect error");
     }
     console.log("!@@!#@$");
     console.log(RetJSON);
});

console.log(RetJSON);