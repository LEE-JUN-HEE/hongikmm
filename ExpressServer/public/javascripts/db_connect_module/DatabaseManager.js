/*
 * 데이터베이스의 메니저 구현
 * 메니저는 다시 유저 디비 와 렝킹 디비 메니저에게
 * 일을 나눠준다.
 * 각 메시지에 맞게 적절한 유저 혹은 렝킹 메니저의
 * 함수를 호출해 사용한다.
 * 유저 혹은 렝킹 메니저를 통해 받은 콜백 함수를 통해서
 * 결과를 받아 다시 응답 메시지를 만들어 ? 전송가능하게
 * 전달해준다.
 */
var mysql = require('mysql');
var con = mysql.createConnection({
     host: "loacalhost",
     user: "root",
     password: "tpwns1",
     database: "GameDB"
});

exports.UserDBConnect = function(queryMesJSON) {
     var responseMessage;
     switch (queryMesJSON.mType) {
          case "SignIn": // db로 새로운 유저 정보 insert
               console.log(queryMesJSON);
               var RetJSON;
               con.connect(function(err) {
                    // if (err) throw err;
               });
               var insertMes = { UID: queryMesJSON.UID, userID: queryMesJSON.userID };

               var query = con.query('INSERT INTO User SET ?', insertMes,
                    function(err, result) {
                         if (err) throw err;
                         console.log(query.sql);

                         RetJSON = {
                              MessageType: "SingIn",
                              SingInState: "true"
                         };
                         console.log("create user");
                         con.end();
                    });

               var selectquery = con.query('SELECT * FROM User ', function(err, rows) {
                    console.log(rows);
  con.end();
               });

               /*
                              var UserSingInQuery = require('./UserDBManager.js').UserSingInQuery;

                              UserSingInQuery(queryMesJSON, fucntion(err, callback) {
                                   responseMessage = {
                                        MessageType: callback.mType,
                                        SignInState: callback.SignInState
                                   };
                                     callback(responseMessage);
                              });
               */
               return RetJSON;
               break;

          case "LogIn":
               var UserLogInQuery = require('./UserDBMager.js').UserLogInQuery;
               UserLogInQuery(queryMesJSON, function(callback) {

               });
               break;

          case "LogOut": //필요한가?
               var UserLogOutQuery = require('./UserDBMager.js').UserLogOutQuery;
               break;

          case "ItemDeal":
               var ItemDealQuery = require('./UserDBMager.js').ItemDealQuery;
               break;

          case "DropOut":
               var DropOutQuery = require('./UserDBMager.js').DropOutQuery;
               break;

          default: //실패 Message를 전달해줄까 생각중
               console.log("dfsdfsdfsd@@@Message not Matched with case");
               break;
     }

}


exports.RankingDBConnect = function(queryMesJSON) {
     switch (queryMesJSON.mType) {
          case "GameScore":
               //var GameScoreQuery = require('./RankingDBMager.js').GameScoreQuery;
               break;

          case "GameBestScore":
               //var GameBsetScoreQuery = require('./RankingDBMager.js').GameBestScoreQuery;
               break;

          case "RankingList":
               //var RankingListQuery = require('./RankingDBMager.js').RankingListQuery;
               break;

          default:
               console.log("Message not Matched with case");
               break;
     }
}
