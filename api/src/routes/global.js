const express = require('express'),
      routes = express.Router();
const userController = require('../controller/user-controller');
var cgvController = require('../controller/cgv-controller');
var imageController = require('../controller/image-controller');

var passport = require('passport');


//회원가입
routes.post('/register', userController.registerUser);
//로그인
routes.post('/login', userController.loginUser);

routes.get('/cgvinfo', cgvController.findmovies);
routes.get('/cgvdetail/:url', cgvController.detailmovie);

//image 업로드
routes.post('/images', passport.authenticate('jwt', { session: false }), imageController.upload.single('file'), imageController.uploadImg);
//profile 불러오기
routes.get('/images/:id', userController.getProfile);
module.exports=routes;