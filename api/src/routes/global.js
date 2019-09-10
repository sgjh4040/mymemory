const express = require('express'),
      routes = express.Router();
const userController = require('../controller/user-controller');
var cgvController = require('../controller/cgv-controller');

//회원가입
routes.post('/register', userController.registerUser);
//로그인
routes.post('/login', userController.loginUser);

routes.get('/cgvinfo', cgvController.findmovies);
routes.get('/cgvdetail/:url', cgvController.detailmovie);


module.exports=routes;