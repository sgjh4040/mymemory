const express = require('express'),
    routes = express.Router();
const userController = require('./controller/user-controller');
const passport = require('passport');
const reviewController = require('./controller/review-controller');
const cgvController = require('./controller/cgv-controller');
const imageController = require('./controller/image-controller');
const kakaoController = require('./controller/kakaoController');
const kakaoApi = require('./kakaoapi/api');



//////////////////////cgv 크롤링 관련//////////////////////////////////
routes.get('/cgvinfo', cgvController.findmovies);
routes.get('/cgvdetail/:url', cgvController.detailmovie);


//////////////////////kakao Rest-API//////////////////////
routes.get('/kakao', kakaoController.getKey);

routes.post('/token', (req, res) => {
    console.log(req.body.key);
    kakaoApi.getToken(req.body.key,(token)=>{
        console.log('token',token);
        kakaoApi.getUser(token.access_token,(user)=>{
            res.send(user);
        })
    })
})

module.exports = routes;