var mongoose = require('mongoose');
var bcryt = require('bcrypt');
var ObjectId = require('mongodb').ObjectId;

var ReviewSchema = new mongoose.Schema({
    writer:{
        type: mongoose.Schema.ObjectId
    },
    title: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    release_date:{
        type: Date,
        required: true
    },
    overview:{
        type: String
    },
    genre:{
        type: String
    },
    seeingDate:{
        type: Date
    },
    poster_path:{
        type: String
    },
    review_score: {
        type: String
    },
    like: {
        type: String 
    },
    images: [{		// 사진
        //[imageid1,id2,id3,id4,id5,id6]
        
    }],
    
});


//find all 
ReviewSchema.statics.reviewList = function(){
    return this.find({}).sort({seeingDate:-1});
    
};

//create new review
ReviewSchema.statics.createReview = function(payload){
    const review = new this(payload);
    return review.save();
    
};

//Find One by reviewId
ReviewSchema.statics.findOneById = function(id){
    let reviewid = id;
    let o_reviewid = new ObjectId(reviewid);
    return this.findOne({_id:o_reviewid});
}
ReviewSchema.statics = {
    reviewList : function(){
        return this.find({}).sort({seeingDate:-1});
    },
    createReview: function(payload){
        const review = new this(payload);
        return review.save();
    },
    findOneById: function(id){
        let reviewid = id;
        let o_reviewid = new ObjectId(reviewid);
        return this.findOne({_id:o_reviewid});
    }
}




module.exports = mongoose.model('testreview',ReviewSchema);
