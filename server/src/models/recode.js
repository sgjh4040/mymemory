var mongoose = require('mongoose');

var RecordSchema = new mongoose.Schema({
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
    watch_date:{
        type: Date
    },
    poster_path:{
        type: String
    },
    review_score: {
        type: String
    },
    images:[{
        filename: String,
        originalName: String,
        desc: String,
        created: { type: Date, default: Date.now }
    }]
})