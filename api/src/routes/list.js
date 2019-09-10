const express = require('express')
const routes = express.Router();
const passport = require('passport');
const reviewController = require('../controller/review-controller');

//list 작성
routes.post('/', passport.authenticate('jwt', { session: false }), reviewController.registerlist);

//list 불러오기
routes.get('/', passport.authenticate('jwt', { session: false }), reviewController.showlists);
//list 삭제
routes.delete('/:id', reviewController.deletelist);

module.exports=routes;