var Image = require('../models/image')
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
    let review_Id = req.params.id;
    // res.send(req.file.filename);

    // res.send(userId);
    let newImage = new Image();
    // newImage.review_id = review_Id;
    newImage.filename = req.file.filename;
    newImage.originalName = req.file.originalname;
    newImage.desc = req.body.desc
    newImage.save(err => {
        if (err) {
            return res.sendStatus(400);
        }
        // res.status(201).send({ newImage });
        res.json({'success': true});
    });

}

module.exports.uploadImg=uploadImg;
module.exports.upload=upload;