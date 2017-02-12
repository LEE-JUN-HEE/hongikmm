

var queryMesJSON = {
     mType: "SignIn",
     UID: "testUID",
     userID: "testuserID"
};

console.log(queryMesJSON);

var UserDBConnect = require('./DatabaseManager.js').UserDBConnect;
UserDBConnect(queryMesJSON, function(callback) {
     console.log(callback);
});
