var User = require('../models/user');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
var config = require('../config/config');
var Review = require('../models/review');


 
function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email,nickname:user.nickname }, config.jwtSecret, {
        expiresIn: 2400 // 86400 expires in 24 hours
      });
}
// exports.testWrite = (req,res)=>{
//     let newUser = Review(req.body);
//     newUser.save((err, result) => {
//         if (err) {
//             return res.status(400).json({ 'msg': err });
//         }
//         return res.status(201).json(result);
//     });
// }

exports.registerUser = (req, res) => {
    console.log(req.body.passwordGroup.password);
    if (!req.body.email || !req.body.passwordGroup.password) {
        return res.status(400).json({ 'msg': '이메일과 비밀번호를 입력하셔야 합니다' });
    }
 
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
 
        if (user) {
            return res.status(400).json({ 'msg': '이미 존재하는 아이디입니다.' });
        }
 
        let newUser = User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            return res.status(201).json(user);
        });
    });
};
 
exports.loginUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ 'msg': 'You need to send email and password' });
    }
 
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
 
        if (!user) {
            return res.status(400).json({ 'msg': '회원 이메일이 존재하지 않습니다!' });
        }
 
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                return res.status(200).json({
                    token: createToken(user)
                });
            } else {
                return res.status(400).json({ msg: '이메일과 비밀번호가 맞지 않습니다!' });
            }
        });
    });
};

exports.getProfile = (req,res)=>{
    let user_id = req.params.id;
    User.findById(user_id,{profile_img:1},(err,user)=>{
        console.log(user);
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
        if(user.profile_img == null ||user.profile_img == ''){
            return;
        }
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join('uploads', user.profile_img.filename)).pipe(res);
        

    })
    
  }