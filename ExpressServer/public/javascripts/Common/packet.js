var type = //enum
 {
    Signin : 0, //회원가입

    Login : 10,
}
exports.type = type;

var ErrorNum = 
 {
     Success : 0,   //성공
}
exports.ErrorNum = ErrorNum;

//C2S
var C2SPacket = {
    type : type.Signin,
}

var REQ_Singin = {
    type : type.Signin,
    uniqueID : '',
}

var REQ_Login = {

}


//S2C
var Res_Singin =
 {
    type : type.Signin,
    ErrorNum : ErrorNum.Success,
}
exports.Res_Singin = Res_Singin;

var Res_Login =
 {
    type : type.Login,
    ErrorNum : ErrorNum.Success,
    UserId : '',
    Name : '',
    Gold : '',
    Level : '',
    Single_Score : '',
    Multi_Score : '',
}
exports.Res_Login = Res_Login;
