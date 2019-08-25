var Record = require('../models/review')
var config = require('../config/config');
var ObjectId = require('mongodb').ObjectId;

exports.registerRecord = (req, res)=>{

    let newRecord = Record(req.body);
    newRecord.save((err,record)=>{
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        return res.status(201).json(record._id);
    })
}

exports.writeRecord = (req,res)=>{
    let newRecord = new Record({
        writer: req.user.id,
        title: req.body.title,
        release_date: req.body.release_date,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        review_score: req.body.revuew_score
    });
    newRecord.save(err=>{
        if (err) {
            return res.sendStatus(400);
        }
        // res.status(201).send({ newImage });
        res.json({'success': true});
    });
}

exports.reviewList = (req,res)=>{
    let userid= req.user.id
    let o_userid = new ObjectId(userid);
    Record.find({writer:o_userid}).exec((err,result) =>{
        if(err){
            console.log('리뷰리스트 불러오기 실패');
            res.sendStatus(400);

        }
        if(result==null || result==''){
            return;
        }
        return res.json(result);
    });
}

