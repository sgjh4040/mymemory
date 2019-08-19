var Image = require('../models/image');
var User = require('../models/user');
var multer = require('multer');

 
var storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,'uploads')
    },
    filename: function(req,file,cb){
      cb(null,file.fieldname+'-'+Date.now())
    }
  });
var upload=  multer({storage:storage})

var uploadImg = (req,res)=>{
    let user_id = req.user._id;
    // res.send(userId);
    let newImage = new Image();
    // newImage.review_id = review_Id;
    newImage.filename = req.file.filename;
    newImage.originalName = req.file.originalname;
    newImage.desc = req.body.desc

    User.findByIdAndUpdate(user_id,{'$set':{profile_img: newImage}}, { 'upsert': true, 'new': true },(err,result)=>{
      if(err){
        return res.status(400).json({ 'msg': err });
      }
      return res.json({'success': true});
    })


}


module.exports.uploadImg=uploadImg;
module.exports.upload=upload;