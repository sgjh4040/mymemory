var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Image = require('../models/image');
var ObjectId = require('mongodb').ObjectId;


var ReviewSchema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewlist_id:{
        type:Schema.Types.ObjectId,
        ref: 'ReviewList'
    },
    title: String,
    release_date:{type: Date, 'default': Date.now},
    director: String,
    overview: String,
    genre: String,
    watch_date: Date,
    poster_path: String,
    backdrop_path: String,
    rating: Number,
    images: String,
    famouse_line: String,
    review: String,
    tags: {type:[],'default': ''},
    images: [Image.schema],
    like: Number,
    liker:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    liker_size: {type:Number, 'default': 0},
    view_cnt: {type:Number, 'default': 0},
    images_id: String
});
ReviewSchema.statics={
    
    //해당 회원 좋아요 누른 상태인지 아닌지 판단
    confirmLike: function(user_id,review_id,callback){
        let o_id= new ObjectId(review_id);
        console.log('conformlike메소드')
        this.find({
            _id : o_id,
            liker : {$in: [user_id]}
        }).then((res)=>{
            if(res[0]){
                console.log('res',res);
                return callback(true);
            }
            return callback(false);
        })
        .catch(err=> {return callback(false)})
    },
    countupViews : function(id,callback){
        let o_id = new ObjectId(id);
        let q = {_id : o_id};
        let set = {'$inc' : {'view_cnt':1}};
        var option = {upsert:true, 'new':true}
        this.findOneAndUpdate(q,set,option,callback);

    }
    
    
}


module.exports = mongoose.model('Review', ReviewSchema);