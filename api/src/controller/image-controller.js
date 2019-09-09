const Image = require('../models/image');
const User = require('../models/user');
const multer = require('multer');

 
const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,'uploads')
    },
    filename: function(req,file,cb){
      cb(null,file.fieldname+'-'+Date.now())
    }
  });
const upload=  multer({storage:storage})

const uploadImg = (req,res)=>{
    const user_id = req.user._id;
    // res.send(userId);
    const newImage = new Image();
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