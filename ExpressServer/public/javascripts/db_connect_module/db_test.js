var mess = require('../Common/packet.js').type;
var Promise = require('promise');
var queryMesJSON = {
     type: mess.LogIn,
     //type: "DropOut",
     UID: "test1UI",
     //userID: "test1ID"
     //CompetitionScore : 1000
};
var RetJSON;
var UserDBConnect = require('./DatabaseManager.js').UserDBConnect;

UserDBConnect(queryMesJSON).then(function(RetJSON){
    console.log(RetJSON);
}, function(err){
    console.log(err);
});

/*
UserDBConnect(queryMesJSON, RetJSON, function(err) {
     if (err) console.log(err);
     console.log(RetJSON);
});
*/
// SignIn 에 관한

// events 모듈 사용

/*
var RankingDBConnect = require('./DatabaseManager.js').RankingDBConnect;

RankingDBConnect(queryMesJSON, RetJSON).then(function(recJSON){
	console.log(recJSON);
});
*/

// console.log(RetJSON);
/* function(err, result){
	if(err) console.log(err);


	console.log("??");
});
*/


