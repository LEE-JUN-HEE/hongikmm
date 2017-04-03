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
var Promise = require('promise');
var mysql = require('mysql');
var con = mysql.createConnection({
     host: "127.0.0.1",
     port: 3306,
     user: "root",
     password: "tpwns1",
     database: "GameDB"
});
var errorMess = require('../Common/packet.js').ErrorNum;
var mess = require('../Common/packet.js').type;



/*
var mess = {
     SignIn : 0,
     LogIn : 10,
     ItemDeal : 20,
     LogOut : 30
     DropOut : 40,
     GameScore : 50,
     GameBestScore : 60,
     RankingList : 70
}*/

var SingInMes; // join message
var UserInfoMes;
//var RetJSON;
var Ranking;
var LogInMes;
var RetJSON;

exports.OpenDBOnce = function(){
    con.connect(function(err) {
        if (err) throw err;
    });
}

exports.UserDBConnect = function(queryMesJSON) {
     return new Promise(function(resolved, rejected) {
          
          switch (queryMesJSON.type) {
               case mess.SignIn: // db로 새로운 유저 정보 insert

                    SingInMes = { UID: queryMesJSON.UID, userID: queryMesJSON.userID };

                    var query = con.query('INSERT INTO User SET ?', SingInMes,
                         function(err) {

                              if (err) {
                                   console.log("insert error emit");
                                   console.log(err);
                                
                                   RetJSON = {
                                        type: queryMesJSON.type,
                                        ErrorNum: errorMess.UserTableSelectError
                                   };
                                   rejected(RetJSON);

                              }


                              console.log("create user");
                              UserInfoMes = { UID: queryMesJSON.UID, userID: queryMesJSON.userID };
                              var query = con.query('INSERT INTO UserInfo SET ?', UserInfoMes,
                                   function(err) {
                                        if (err) {
                                             console.log("userinfo create fail");
                                             console.log(err);
                                             
                                             RetJSON = {
                                                  type: queryMesJSON.type,
                                                  ErrorNum: errorMess.UserInfoTableInsertError
                                             };

                                             rejected(RetJSON);
                                        }

                                        console.log("create UserInfo");

                                        var ranking;
                                        var query = con.query('SELECT * FROM Ranking', function(err, rows, cols) {
                                             if (err) {
                                                  console.log("ranking counting fail");
                                                  console.log(err);
                                                  errorNum = 40;
                                                  RetJSON = {
                                                       type: queryMesJSON.type,
                                                       ErrorNum: errorNum
                                                  };
                                                  rejected(RetJSON);
                                             }
                                             console.log("create ranking");

                                             ranking = rows.length + 1;

                                             Ranking = { UID: queryMesJSON.UID, Rank: ranking, userID: queryMesJSON.userID };
                                             var query = con.query('INSERT INTO Ranking SET ?', Ranking,
                                                  function(err, callback) {
                                                       if (err) {
                                                            console.log("ranking create fail");
                                                            console.log(err);
                                                            
                                                            RetJSON = {
                                                                 type: queryMesJSON.type,
                                                                 ErrorNum: errorMess.RankingTableInsertError
                                                            };
                                                            rejected(RetJSON);
                                                       }

                                                       //con.end();

                                                       RetJSON = {
                                                            type: queryMesJSON.type,
                                                            ErrorNum: errorMess.Success
                                                       };
                                                       resolved(RetJSON);
                                                  });
                                        });
                                   });

                         });

                    break;

               case mess.LogIn:

                    //con.connect(function(err) {
                    //     if (err) throw err;
                    //});
                  
                    var query = con.query('SELECT * FROM UserInfo WHERE UID = ?', queryMesJSON.UID,
                        function(rows) {
                            
                            if (rows == null) {
                                console.log("login err");
                                console.log(rows);

                                RetJSON = {
                                        type: queryMesJSON.type,
                                        ErrorNum: errorMess.UserTableSelectError
                                };
                                //con.end();
                                rejected(RetJSON);
                            }
                            else{
                                RetJSON = {
                                    type: queryMesJSON.type,
                                    UID: rows[0].UID,
                                    Level: rows[0].Level,
                                    money: rows[0].money,
                                    ErrorNum: errorMess.Success
                                };
                                //con.end();
                                //console.log(RetJSON);
                                resolved(RetJSON);
                            }
                        });
                    break;

               case mess.LogOut: //필요한가?

                    break;

               case mess.ItemDeal:

                    break;

               case mess.DropOut:

                    con.connect(function(err) {
                         if (err) throw err;
                    });

                    var query = con.query('DELETE FROM User WHERE UID = ?', queryMesJSON.UID,
                         function(err, rows, cols) {
                              if (err) {
                                   console.log("ranking delete fail");
                                   console.log(err);
                                   
                                   RetJSON = {
                                        type: queryMesJSON.type,
                                        ErrorNum: errorMess.UserRowDeleteError
                                   };
                                   rejected(RetJSON);
                              }

                              var query = con.query('DELETE FROM UserInfo WHERE UID = ?', queryMesJSON.UID,
                                   function(err, rows, cols) {
                                       console.log("??");
                                        if (err) {
                                             console.log("ranking create fail");
                                             console.log(err);
                                             
                                             RetJSON = {
                                                  type: queryMesJSON.type,
                                                  ErrorNum: errorMess.UserInfoRowDeleteError
                                             };
                                             rejected(RetJSON);
                                        }

                                        var query = con.query('DELETE FROM Ranking WHERE UID = ?', queryMesJSON.UID,
                                             function(err, rows, cols) {
                                                  if (err) {
                                                       console.log("ranking create fail");
                                                       console.log(err);
                                                       
                                                       RetJSON = {
                                                            type: queryMesJSON.type,
                                                            ErrorNum: errorMess.RankingRowDeleteError
                                                       };
                                                        rejected(RetJSON);
                                                  }

                                                  RetJSON = {
                                                       type: queryMesJSON.type,
                                                       ErrorNum: errorNum
                                                  };

                                                  //console.log(rows);

                                                  con.end();
                                                  resolved(RetJSON);
                                             });
                                   });
                         });
                    break;

               default: //실패 Message를 전달해줄까 생각중
                    RetJSON ={
                        ErrorNum: errorMess.UnkowntypeError 
                    };
                    rejected(RetJSON);
                    //console.log(queryMesJSON.type);
                    break;
          }
     });
}


exports.RankingDBConnect = function(queryMesJSON, RetJSON) {
     return new Promise(function(resolved, rejected) {
          
          switch (queryMesJSON.type) {
               case mess.SingleGameScore:
                    var query = con.query('SELECT SingleScore from Ranking WHERE UID = ?', queryMesJSON.UID,
                         function(err, rows, cols) {
                              if (rows == null) {
                                   console.log(err);
                                   
                                   RetJSON = {
                                        type: queryMesJSON.type,
                                        SingleScore: rows[0].SingleScore,
                                        ErrorNum: errorMess.RankingTableSelectError
                                   };
                                   rejected(RetJSON);
                              }
                              else{
                                RetJSON = {
                                    type: queryMesJSON.type,
                                    SingleScore: rows[0].SingleScore,
                                    ErrorNum: errorNum
                                };
                                //console.log(rows[0]);

                                con.end();
                                resolved(RetJSON);
                              }
                         });
                    break;

               case mess.CompetitionGameScore:
                    var rows;
                    var query = con.query('SELECT CompetitionScore FROM Ranking WHERE UID = ?', queryMesJSON.UID,
                         function(err, rows, cols) {
                              if (rows == null) {
                                   console.log(err);
                                
                                   RetJSON = {
                                        type: queryMesJSON.type,
                                        CompetitionScore: rows[0].CompetitionScore,
                                        ErrorNum: errorMess.RankingTableSelectError
                                   };
                                   rejected(RetJSON);
                              }
                              //console.log(rows[0]);
                              else{
                                RetJSON = {
                                    type: queryMesJSON.type,
                                    CompetitionScore: rows[0].CompetitionScore,
                                    ErrorNum: errorNum
                                };
                                //console.log(rows[0].CompetitionScore);

                                con.end();
                                //callback(RetJSON);
                                //console.log(RetJSON);
                                resolved(RetJSON);
                              }
                         });

                    break;

               case mess.SingleGameScoreUpdate:
                    con.connect(function(err) {
                         if (err) throw err;
                    });

                    var query = con.query('UPDATE Ranking SET SingleScore = ? WHERE UID = ?', [queryMesJSON.SingleScore, queryMesJSON.UID],
                         function(err, rows, cols) {
                              if (err) {
                                   console.log(err);
                                   
                                   RetJSON = {
                                        type: queryMesJSON.type,
                                        //SingleScore: rows[0].SingleScore,
                                        ErrorNum: errorMess.RankingTableUpdateError
                                   };
                                   rejected(RetJSON);
                              }

                              RetJSON = {
                                   type: queryMesJSON.type,
                                   //SingleScore: rows[0].SingleScore,
                                   ErrorNum: errorMess.Success
                              };
                              //console.log(rows[0]);

                              con.end();
                              resolved(RetJSON);
                         });
                    break;

               case mess.CompetitionGameScoreUpdate:
                    con.connect(function(err) {
                         if (err) throw err;
                    });

                    var query = con.query('UPDATE Ranking SET CompetitionScore = ? WHERE UID = ?', [queryMesJSON.CompetitionScore, queryMesJSON.UID],
                         function(err, rows, cols) {
                              if (err) {
                                   console.log(err);
                                   
                                   RetJSON = {
                                        type: queryMesJSON.type,
                                        //CompetitionScore : rows[0].CompetitionScore ,
                                        ErrorNum: errorMess.RankingTableUpdateError
                                   };
                                   rejected(RetJSON);
                              }

                              //console.log(rows);
                              RetJSON = {
                                   type: queryMesJSON.type,
                                   //CompetitionScore : rows[0].CompetitionScore ,
                                   ErrorNum: errorMess.Success
                              };
                              con.end();
                              resolved(RetJSON);
                         });
                    break;
               case mess.GameBestScore:

                    break;

               case mess.RankingList:
                    con.connect(function(err) {
                         if (err) throw err;
                    });

                    var query = con.query('SELECT * FROM Ranking',
                         function(err, rows, cols) {
                              if (rows == null) {
                                   console.log(err);
                                   
                                   RetJSON = {
                                        type: queryMesJSON.type,
                                        Ranks: rows,
                                        ErrorNum: errorMess.RankingTableSelectError
                                   };
                                   rejected(RetJSON);
                              }

                              //console.log(rows[0]);
                              else {
                                RetJSON = {
                                    type: queryMesJSON.type,
                                    Ranks: rows,
                                    ErrorNum: errorMess.Success  
                                };
                                con.end();
                                resolved(RetJSON);
                              }
                         });
                    break;

               default:
                    RetJSON = {
                        ErrorNum: errorMess.UnkowntypeError
                    }
                    //console.log("Message not Matched with case");
                    break;
          }
     });
     //console.log("@#$@$");
     //return RetJSON;
}
