const express = require('express');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const  User = require('../schemas/user');

const router = express.Router();

function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.jwtSecret, {
        expiresIn: 60*60 // 86400 expires in 24 hours
      });
}


router.post('/test',passport.authenticate('jwt',{
    session: false 
}),(req,res)=>{
    console.log('도착');
    return res.status(200).json('인증되었습니다')
})

router.post('/register',isNotLoggedIn,async(req,res,next)=>{
    console.log(req.body);
    const { email, nickname, password } = req.body;
    console.log(email);
  try {
    const exUser = await User.findOne({ email:email});
    if (exUser) {
        return res.status(400).json({ 'msg': '이미 존재하는 아이디입니다.' });
    }
    let newUser = User(req.body);
    let user = await newUser.save()
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ 'msg': err });
  }
})
router.post('/login',isNotLoggedIn,(req,res,next)=>{
console.log('routers/users login 으로 왔습니다.')
passport.authenticate('local',{
    session: false 
},(authError,user,info)=>{
    //인증중 오류
    if(authError){
        console.log('authError');
        console.error(authError);
        return next(authError);
    }
    //로그인 실패
    if(!user){
        console.log('!user');
        return res.status(400).json({ 'msg' : info.message });
    }
    //로그인 성공
    console.log('성공')
    return res.status(200).json({
        token: createToken(user)
    })
    
    
})(req, res, next);
})

module.exports=router;