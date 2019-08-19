var Reviewlist = require('../models/reviewList');
var Review = require('../models/review');
var ObjectId = require('mongodb').ObjectId;

var write = {
    //reviewlist 삭제
    deletelist:(req,res)=>{
        let reviewlist_id =req.params.id;
        console.log(reviewlist_id);

        Reviewlist.findByIdAndRemove(reviewlist_id, (err, result) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            };
            console.log('삭제완료 res:', result);
            return res.status(201).json(result);
        })
    },

    //리뷰 리스트 작성
    registerlist: (req, res) => {
        let newReviewList = Reviewlist(req.body);
        // let o_id = new ObjectId(req.user.id)
        newReviewList.writer = req.user.id;
        newReviewList.save((err, result) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            return res.status(201).json(result);
        })
    },
    // //리뷰 리스트 불러오기
    showlist: (req, res) => {
        Reviewlist.find({ writer: req.user.id }).populate('reviews').exec((err, result) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            };
            return res.json(result)
        });
    },
    //리뷰 불러오기
    showreview: (req, res) => {
        let reviewlist_id = req.params.id;
        let o_id = new ObjectId(reviewlist_id);
        Review.find({ reviewlist_id: o_id }, (err, result) => {
            if (result) {
                Reviewlist.countupViews(reviewlist_id, (err1, result1) => {
                    if (err1) {
                        console.log("조회수up error");
                        return;
                    }
                });
                return res.json(result);
            }
        })
    },
    //Review title search
    
    findReviewBytitle: (req,res)=>{
        let searchTerm = req.params.id;
        let role = req.query.role;
        console.log('role',role);
        switch(role){
            case 'view_cnt': {role='view_cnt';break;}
            case 'liker_cnt': {role= 'liker_size';break;}
            default: {role='liker_size';}
        }
        console.log('role',role);
        Review.find({title:{$regex: searchTerm}}).sort('-'+role).exec((err, result) => {
            console.log('result');
            if (err) {
                return res.status(400).json({ 'msg': err });
            };
            return res.json(result)
        });
    },
    //review 삭제
    deleteReview: (req, res) => {
        let review_id = req.params.id;
        Review.findByIdAndDelete(review_id, (err, result) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            };
            console.log('삭제완료 res:', result);
            return res.json(result);
        })
    },

    //리뷰 작성(subdocument 되어있을때)
    registerReview: (req, res) => {
        console.log('req.body.list.id', req.body.id);
        Reviewlist.findByIdAndUpdate(req.body.id, { '$push': { 'reviews': { 'title': req.body.title } }}, { 'upsert': true, 'new': true }, (err, result) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            return res.status(201).json(result);
        })
    },
    //리뷰 작성( collection 따로 되어 있을때)
    registerReviews: (req, res) => {
        console.log(req.body.tags);
        let tags = (req.body.tags).split(',');//tags string 배열로 분리
        req.body.tags = tags;
        let newReview = Review(req.body);
        newReview.writer = req.user._id;
        newReview.save((err, result) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            Reviewlist.findByIdAndUpdate(req.body.reviewlist_id, { '$push': { 'reviews': result._id  } }, { 'upsert': true, 'new': true }, (err2, result) => {
                if (err2) {
                    return res.status(400).json({ 'msg': err2 });
                }
            })
            return res.status(201).json(result);
        })
    },
    showDetailReview: (req, res) => {
        let review_id = req.params.id;
        Review.findById(review_id, (err, result) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            if (result) {
                Review.countupViews(review_id, (err1, result1) => {
                    if (err1) {
                        console.log("조회수up error");
                        return;
                    }
                });
                return res.json(result);
            }
        })
    },

    addliker: (req,res)=>{
        let user_id = req.user._id;
        let review_id = req.params.id;

        Review.confirmLike(user_id,review_id,result=>{
            console.log(result);
            if(!result){
                console.log(result);
                Review.findByIdAndUpdate(review_id,{ '$push': { 'liker': user_id },'$inc':{'liker_size':1}  }, { 'upsert': true, 'new': true },(err,result)=>{
                    if (err) {
                        return res.status(400).json({ 'msg': err });
                    }
                    return res.status(201).json({msg: '좋아요 감사해요!'});
                });

            }else{
                Review.findByIdAndUpdate(review_id,{ '$pull': { 'liker': user_id } }, { 'upsert': true, 'new': true },(err,result)=>{
                    if (err) {
                        return res.status(400).json({ 'msg': err });
                    }
                    
                    return res.status(201).json({ msg: '다시 좋아요 해주세요..' });
                });
               
            }
           
        })

        
    },
    checkReview: (req,res)=>{
        let user_id = req.user._id;
        let review_id = req.params.id;

        Review.confirmLike(user_id,review_id,result=>{
            return res.json(result);
        })
    }

}



module.exports = write;