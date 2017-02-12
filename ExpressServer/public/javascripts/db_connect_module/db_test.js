var queryMesJSON = {
     mType: "SignIn",
     UID: "testUID",
     userID: "testuserID"
};

console.log(queryMesJSON);

var UserDBConnect = require('./DatabaseManager.js').UserDBConnect;
try {
     UserDBConnect(queryMesJSON, function(err, callback) {
         // if (err) throw callback;
          console.log("@@try");
     });
} catch (mes){
     console.log("@@catch");
}
