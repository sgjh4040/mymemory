var express = require('express'),
    routes = express.Router();
var userController = require('./controller/user-controller');
var passport = require('passport');
var reviewController = require('./controller/review-controller');
var cgvController = require('./controller/cgv-controller');
var imageController = require('./controller/image-controller');
var kakaoController = require('./controller/kakaoController');
// var request = require('request');
var kakaoApi = require('./kakaoapi/api');


// //review 작성
// routes.post('/review', passport.authenticate('jwt', { session: false }), reviewController.registerReviews);
// //review 수정
// routes.patch('/review/:id',passport.authenticate('jwt', { session: false }),
// reviewController.editReview)
// //리뷰 삭제
// routes.delete('/review/:id', reviewController.deleteReview);

// //review 불러오기(list id값으로)
// routes.get('/review/:id', reviewController.showreview);

// //review 불러오기(review id값으로)
// routes.get('/review/detail/:id', reviewController.showDetailReview);


//리뷰 검색(title로)
routes.get('/review/search/:id', reviewController.findReviewBytitle);

//리뷰 좋아요 up
routes.get('/review-like/:id', passport.authenticate('jwt', { session: false }), reviewController.addliker);

//좋아요 상태 확인
routes.get('/reviewup/state/:id', passport.authenticate('jwt', { session: false }),
    reviewController.checkReview);



//////////////////////cgv 크롤링 관련//////////////////////////////////
routes.get('/cgvinfo', cgvController.findmovies);
routes.get('/cgvdetail/:url', cgvController.detailmovie);


//image 업로드
routes.post('/images', passport.authenticate('jwt', { session: false }), imageController.upload.single('file'), imageController.uploadImg);
//profile 불러오기
routes.get('/images/:id', userController.getProfile);


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