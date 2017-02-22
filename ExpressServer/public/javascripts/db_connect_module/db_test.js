var mess = require('../Common/packet.js').type;
var Promise = require('promise');
var queryMesJSON = {
     type: mess.SingleGameScore,
     //type: "DropOut",
     UID: "test1UID",
     //userID: "test1ID"
     //CompetitionScore : 1000
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
});

UserDBConnect(queryMesJSON, RetJSON, function(err) {
     if (err) console.log(err);
     console.log(RetJSON);
});
*/
// SignIn 에 관한

// events 모듈 사용


var RankingDBConnect = require('./DatabaseManager.js').RankingDBConnect;

RankingDBConnect(queryMesJSON, RetJSON).then(function(recJSON){
	console.log(recJSON);
});


// console.log(RetJSON);
/* function(err, result){
	if(err) console.log(err);


	console.log("??");
});
*/
