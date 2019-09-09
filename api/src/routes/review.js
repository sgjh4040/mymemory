const express = require('express'),
      routes = express.Router();
const passport = require('passport');
const reviewController = require('./controller/review-controller');


//review 작성
routes.post('/review', passport.authenticate('jwt', { session: false }), reviewController.registerReviews);
//review 수정
routes.patch('/review/:id',passport.authenticate('jwt', { session: false }),
reviewController.editReview)
//리뷰 삭제
routes.delete('/review/:id', reviewController.deleteReview);

//review 불러오기(list id값으로)
routes.get('/review/:id', reviewController.showreview);

//review 불러오기(review id값으로)
routes.get('/review/detail/:id', reviewController.showDetailReview);