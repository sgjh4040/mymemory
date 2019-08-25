var mongoose = require('mongoose');


 
  // Actual DB model
var imageSchema = new mongoose.Schema({
    user: mongoose.Schema.ObjectId,
    filename: String,
    originalName: String,
    desc: String,
    created: { type: Date, default: Date.now }
});

// imageSchema.statics.createImage = function(payload){
//     const review = new this(payload);
//     return review.save();
// };

// imageSchema.statics.updateById = function(id,payload){
//   return this.findOneAndUpdate({"user":id},payload, {new: true});
// }
 
module.exports = mongoose.model('Image', imageSchema);