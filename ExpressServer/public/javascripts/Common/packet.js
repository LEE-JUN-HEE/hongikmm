var type = { //enum

     SignIn: 0, //회원가입

     LogIn: 10, //로그인

     ItemDeal: 20, //아이템 거래

     LogOut: 30, //로그와웃 확장성을 생각해 냅둠

     DropOut: 40, //회원 탈퇴

     SingleGameScore: 50, //singlegame score 확인

     CompetitionGameScore: 60, //경쟁전 점수 확인

     SingleGameScoreUpdate: 70, //게임 실행후 결과 갱신

     CompetitionGameScoreUpdate: 80, //경쟁전 실행후 결과 갱신

     GameBestScore: 90, //유저의 최고 점수 확인

     RankingList: 100 //랭킹 확인 페이지에서 랭킹 확인
}
module.exports.type = type;

var ErrorNum = {
     Success: 0, //성공

     UserTableInsertError: 10, //유저 테이블  insert문에러

     UserInfoTableInsertError: 20, //userInfo테이블 insert문 에러

     RankingTableInsertError: 30, //랭켕 테이블 insert 문 에러

     UserTableSelectError: 40, //user table select query error

     RankingTableSelectError: 50, //랭킹 테이블 select문 에러

     RankingTableUpdateError: 60, //ranking table update query error

     UserRowDeleteError: 80, //user table delete query error

     UserInfoRowDeleteError: 90, //userInfo table delete query error

     RankingRowDeleteError: 100, //ranking delete query error

     UnkownError: 200, //unkown error

     DBconnectError: 400, //db connect error
}
module.exports.ErrorNum = ErrorNum;

//C2S
var C2SPacket = {
     type: type.Signin,
}

var REQ_Singin = {
     type: type.Signin,
     uniqueID: '',
}

var REQ_Login = {

}


//S2C
var Res_Singin = {
     type: type.Signin,
     ErrorNum: ErrorNum.Success,
}
exports.Res_Singin = Res_Singin;

var Res_Login = {
     type: type.Login,
     ErrorNum: ErrorNum.Success,
     UserId: '',
     Name: '',
     Gold: '',
     Level: '',
     Single_Score: '',
     Multi_Score: '',
}
exports.Res_Login = Res_Login;

/*
 * 주고 받는 메시지 정리
 *
 * 숫자가 들어가는 필드는 -1값으로
 * 스트링 값들은 필드명과 같은 이름으로
 * ErrorNum은 0으로 디폴트 값을 지정
 */

var SignIn = {
     type: type.SignIn,
     UID: "UID",
     userID: "userID"
}

var RetSignIn = {
     type: type.SingIn,
     ErrorNum: 0
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

var LogIn = {
     type: type.LogIn,
     UID: "UID"
}

var RetLogIn = {
     type: type.LogIn,
     UID: "UID",
     Level: 0,
     userID: "userID",
     money: -1,
     ErrorNum: 0
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

var ItemDeal = {
     //미구현
}

var RetItemDeal = {

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

var DropOut = {
     type: type.DropOut,
     UID: "UID"
}

var RetDropOut = {
     type: type.DropOut,
     ErrorNum: 0
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

var SingleGameScore = {
     type: type.SingleGameScore,
     UID: "UID"
}

var RetSingleGameScore = {
     type: type.SingleGameScore,
     SingleScore: -1
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

var CompetitionGameScore = {
     type: type.CompetitionGameScroe,
     UID: "UID"
}

var RetCompetitionGameScore = {
     type: type.CompetitionGameScroe,
     CompetitionScore: -1,
     ErrorNum: 0
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

var SingleGameScoreUpdate = {
     type: type.SingleGameScoreUpdate,
     UID: "UID",
     SingleScore: -1
}

var RetSingleGameScoreUpdate = {
     type: type.SingleGameScoreUpdate,
     ErrorNum: 0
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

var CompetitionGameScoreUpdate = {
     type: type.CompetitionGameScoreUpdate,
     UID: "UID"
}
var RetCompetitionGameScoreUpdate = {
     type: type.CompetitionGameScoreUpdate,
     ErrorNum: 0
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

var RankingList = {
     type: type.RankingList,
}

var RetRankingList = {
     type: type.RankingList,
     Ranks: -1,
     ErrorNum: 0
}
