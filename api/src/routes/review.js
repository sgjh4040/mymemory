const express = require('express'),
      routes = express.Router();
const passport = require('passport');
const reviewController = require('../controller/review-controller');


//review 작성
routes.post('/', passport.authenticate('jwt', { session: false }), reviewController.registerReviews);
//review 수정
routes.patch('/:id',passport.authenticate('jwt', { session: false }),
reviewController.editReview)
//review 삭제
routes.delete('/:id', reviewController.deleteReview);

//review 불러오기(list id값으로)
routes.get('/:id', reviewController.showreview);

//review 불러오기(review id값으로)
routes.get('/detail/:id', reviewController.showDetailReview);

//review 좋아요 up
routes.get('/like/:id', passport.authenticate('jwt', { session: false }), reviewController.addliker);
//review 좋아요 상태
routes.get('/state/:id', passport.authenticate('jwt', { session: false }),reviewController.checkReview);

//review 검색(title로)
routes.get('/search/:id', reviewController.findReviewBytitle);

module.exports = routes;