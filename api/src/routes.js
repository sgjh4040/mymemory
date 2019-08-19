var express         = require('express'),
    routes          = express.Router();
var userController  = require('./controller/user-controller');
var passport	    = require('passport');
var reviewController = require('./controller/review-controller');
var cgvController = require('./controller/cgv-controller');
var imageController = require('./controller/image-controller')



routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});
 
routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);

//list 작성
routes.post('/list', passport.authenticate('jwt', { session: false }), reviewController.registerlist);

//list 불러오기
routes.get('/list', passport.authenticate('jwt', { session: false }),reviewController.showlist);
//list 삭제
routes.delete('/list/:id',reviewController.deletelist);

//review 작성
routes.post('/review',passport.authenticate('jwt', { session: false }),reviewController.registerReviews);
//리뷰 삭제
routes.delete('/review/:id',reviewController.deleteReview);

//review 불러오기(list id값으로)
routes.get('/review/:id',reviewController.showreview);

//review 불러오기(review id값으로)
routes.get('/review/detail/:id',reviewController.showDetailReview);


//리뷰 검색(title로)
routes.get('/search/review/:id',reviewController.findReviewBytitle);
 
routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});
//리뷰 좋아요 up
routes.get('/search/reviewup/:id',passport.authenticate('jwt', { session: false }),reviewController.addliker);

//좋아요 상태 확인
routes.get('/reviewup/state/:id',passport.authenticate('jwt', { session: false }),
reviewController.checkReview);



//////////////////////cgv 크롤링 관련//////////////////////////////////
routes.get('/cgvinfo',cgvController.findmovies);
routes.get('/cgvdetail/:url',cgvController.detailmovie);


//image 업로드
routes.post('/images',passport.authenticate('jwt', { session: false }),imageController.upload.single('file'), imageController.uploadImg);
//profile 불러오기
routes.get('/images/:id',userController.getProfile);

 
module.exports = routes;