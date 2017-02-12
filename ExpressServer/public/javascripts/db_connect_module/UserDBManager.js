/*
var mysql = require('mysql');
var con = mysql.createConnection({
     host: "loacalhost",
     user: "root",
     password: "tpwns1",
     database: "GameDB"
});

exports.UserSingInQuery = function(queryMesJSON) {
     con.connect(function(err) {
          if (err) throw err;
     });
     var query = con.query('INSERT INTO User SET ?', queryMesJSON,
          function(err, result) {
               if (err) throw err;
               console.log(query);

               var RetJSON = { MessageType: "SingIn",
               			SingInState: "true" };
               console.log("create user");
               callback(RetJSON);
               con.end();
          });
}

exprots.UserLogInQuery = function(queryMesJSON) {

}

exprots.UserLogOutQuery = function(queryMesJSON) {

}

exprots.ItemDealQuery = function(queryMesJSON) {

}

exprots.DropOutQuery = function(queryMesJSON) {

}
*/



