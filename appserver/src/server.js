const express = require('express'); //express 서버
const path = require('path'); //경로설정
const passport = require('passport');   //여권(회원확인)
const morgan = require('morgan'); //req 요청 보기
const connect = require('./schemas');
const usersRouter = require('./routes/users');    //Userrouter
const passportConfig = require('./passport');
var cors        = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
passportConfig(passport);
connect();

app.set('port', process.env.PORT || 5000);

app.use((req,res,next)=>{
    console.log(req.url,'저는 test용 미들웨어입니다.');
    next();
})


//요청에 대한 정보를 콘솔로 기록
app.use(morgan('dev'));
//static 폴더 불러오기,정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

//bodyparser의 일부기능, 일부기능이 express에 내장되어있음. 본문을 해석해줌
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
// app.use(passport.session());    
app.use('/api', usersRouter);


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});