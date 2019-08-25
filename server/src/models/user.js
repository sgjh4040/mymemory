var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Image = require('./image');
  
var imageSchema =mongoose.Schema({
    user: mongoose.Schema.ObjectId,
    filename: String,
    originalName: String,
    desc: String,
    created: { type: Date, default: Date.now }
});

var UserSchema = new mongoose.Schema({
  email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
  password: {
        type: String,
        required: true
    },
   nickname: {
       type: String,
       trim: true
   },
   profile_img: imageSchema
   
});

 
UserSchema.pre('save',  function(next) {
    var user = this;
 
     if (!user.isModified('password')) return next();
 
     bcrypt.genSalt(10, function(err, salt) {
         if (err) return next(err);
 
         bcrypt.hash(user.password, salt, function(err, hash) {
             if (err) return next(err);
 
             user.password = hash;
             next();
         });
     });
});
 
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
///////////////////////////////////////////////
UserSchema.methods = {
    comparePassword: function(candidatePassword, cb){
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    }
}
 
module.exports = mongoose.model('test', UserSchema);