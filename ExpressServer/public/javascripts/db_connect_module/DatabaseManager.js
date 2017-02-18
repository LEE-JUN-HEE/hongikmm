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
     host: "127.0.0.1",
     port: 3306,
     user: "root",
     password: "tpwns1",
     database: "GameDB"
});

var SingInMes; // join message
var UserInfoMes;
//var RetJSON;
var Ranking;
var LogInMes;

exports.UserDBConnect = function(queryMesJSON, RetJSON) {
     var responseMessage;
     switch (queryMesJSON.mType) {
          case "SignIn": // db로 새로운 유저 정보 insert

               con.connect(function(err) {
                    if (err) throw err;
               });
               var state = true;
               SingInMes = { UID: queryMesJSON.UID, userID: queryMesJSON.userID };

               var query = con.query('INSERT INTO User SET ?', SingInMes,
                    function(err) {

                         if (err) {
                              console.log("insert error emit");
                              console.log(err);
                              state = false;
                              // throw (new Error (err));
                         }


                         console.log("create user");
                         UserInfoMes = { UID: queryMesJSON.UID, userID: queryMesJSON.userID }
                         var query = con.query('INSERT INTO UserInfo SET ?', UserInfoMes,
                              function(err) {
                                   if (err) {
                                        console.log("userinfo create fail");
                                        console.log(err);
                                        state = false;
                                   }

                                   console.log("create UserInfo");

                                   var ranking;
                                   var query = con.query('SELECT * FROM Ranking', function(err, rows, cols) {
                                        if (err) {
                                             console.log("ranking counting fail");
                                             console.log(err);
                                             state = false;
                                        }
                                        console.log("create ranking");

                                        ranking = rows.length + 1;

                                        Ranking = { UID: queryMesJSON.UID, Rank: ranking, userID: queryMesJSON.userID }
                                        var query = con.query('INSERT INTO Ranking SET ?', UserInfoMes,
                                             function(err, callback) {
                                                  if (err) {
                                                       console.log("ranking create fail");
                                                       console.log(err);
                                                       state = false;
                                                  }

                                                  con.end();


                                                  if (state) {
                                                       RetJSON = {
                                                            MType: "SingIn",
                                                            userID: query.values.userID,
                                                            SingInState: "true"
                                                       };
                                                  } else {
                                                       RetJSON = {
                                                            MType: "SingIn",
                                                            userID: query.values.userID,
                                                            SingInState: "false"
                                                       };
                                                  }

                                                  callbackJSON = RetJSON;
                                             });

                                   });

                              });
                         //con.end();
                    });



               break;

          case "LogIn":

               con.connect(function(err) {
                    if (err) throw err;
               });
               var query = con.query('SELECT * FROM UserInfo WHERE UID = ?', queryMesJSON.UID,
                    function(err, rows, cols) {
                         if (err) {
                              console.log("ranking create fail");
                              console.log(err);

                         }

                         RetJSON = {
                              mType: "LogIn",
                              UID: rows[0].UID,
                              Level:rows[0].Level,
                              userID:rows[0].userID,
                              money: rows[0].money,
                              CompetitionScore: rows[0].CompetitionScore,
                              SingleScore: rows[0].SingleScore
                         }
                         console.log(RetJSON);

                         con.end();
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
