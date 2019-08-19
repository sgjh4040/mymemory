var mongoose = require('mongoose');
var Review = require('../models/review')
var ObjectId = require('mongodb').ObjectId;

var Schema = mongoose.Schema;

var ReviewListSchema = new Schema({
    title: String,
    profile: String,
    last_date:  {type: Date, 'default': Date.now},
    count: {type: Number, 'default': 0},
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
       
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
});

ReviewListSchema.statics={
    countupViews : function(id,callback){
        let o_id = new ObjectId(id);
        let q = {_id : o_id};
        let set = {'$inc' : {'count':1}};
        var option = {upsert:true, 'new':true}
        this.findOneAndUpdate(q,set,option,callback);

    }
}

module.exports = mongoose.model('ReviewList', ReviewListSchema);