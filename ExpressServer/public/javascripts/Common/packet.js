var type = {        //enum

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
exports.type = type;

var ErrorNum = {
     Success: 0, //성공

     UserTableInsertError : 10,   //유저 테이블  insert문에러

     UserInfoTableInsertError : 20, //userInfo테이블 insert문 에러

     RankingTableInsertError : 30, //랭켕 테이블 insert 문 에러

     UserTableSelectError : 40, //user table select query error

     RankingTableSelectError : 50,  //랭킹 테이블 select문 에러

     RankingTableUpdateError : 60, //ranking table update query error

     UserRowDeleteError: 80, //user table delete query error

     UserInfoRowDeleteError: 90, //userInfo table delete query error

     RankingRowDeleteError: 100, //ranking delete query error

     UnkownError: 200, //unkown error

     DBconnectError : 400, //db connect error
}
exports.ErrorNum = ErrorNum;

//C2S
var C2SPacket = {
     type: type.Signin,
}

var REQ_Singin = {
     type: type.Signin,
     UID: '',
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

//S2S
var S2S_SignIn = {
    type: type.SignIn,
    UID:  UID,
    userID: userID
}
exports.S2S_SignIn = S2S_SignIn;

var S2S_LogIn = {
    mType: LogIn,
	UID: UID
}
exports.S2S_Login = S2S_LogIn;