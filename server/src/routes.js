var express         = require('express'),
    routes          = express.Router();
var userController  = require('./controller/user-controller');
var recordController = require('./controller/record-controller')
var passport	    = require('passport');
var Review = require('./models/review');
var multer = require('multer');
var Image = require('./models/image');
var fs = require('fs');
var path = require('path');
var reviewImage = require('./models/reviewImage');


var storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,'uploads')
    },
    filename: function(req,file,cb){
      cb(null,file.fieldname+'-'+Date.now())
    }
  });
  let upload=  multer({storage:storage})

routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});
 
routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
 
routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `하이 ${req.user.id}! 연결잘되어있어~.` });
});
/////////////리뷰 등록
routes.post('/record',passport.authenticate('jwt', { session: false }),recordController.writeRecord);

///user 리뷰 리스트
routes.get('/record',passport.authenticate('jwt', { session: false }),recordController.reviewList);

routes.get('/list',(req, res) => {
    Review.reviewList()
    .then((result)=>{
        if(!result.length) return res.status(404).send({err:'에러에러'});
        return res.json(result);
        // res.send(`${result}`);
    })
    .catch(err => res.status(500).send(err));
});

//review 등록
// routes.post('/list',(req,res) => {
//     Review.createReview(req.body)
//     .then((result) => res.send(result._id))
//     .catch(err => res.status(500).send(err));
// });

//review title로 검색
routes.get('/record/:id', (req,res) => {
    Review.findOneById(req.params.id)
    .then((result) => {
        if(!result) return res.status(404).send({err:'error'});
        res.send(result);
    })
    .catch(err => res.status(500).send(err));
});

routes.post('/images',upload.single('file'),(req,res,next)=>{
    let newImage = new reviewImage();
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
})

routes.get('/images', (req, res, next) => {
    // use lean() to get a plain JS object(JS 객체형태로 변형)
    // remove the version key from the response(__V 키 필요없으므로 제거)
    Image.find({}, '-__v').lean().exec((err, images) => {
        if (err) {
            res.sendStatus(400);
        }
 
        // Manually set the correct URL to each image(검색후 URL 을 보내어 나중에 URL 요청으로 사진 보여줌)
        for (let i = 0; i < images.length; i++) {
            var img = images[i];
            img.url = req.protocol + '://' + req.get('host') + '/api/images/' + img._id;
        }
        res.json(images);
    })
});

routes.get('/images/:id', (req, res, next) => {
    let imgId = req.params.id;
    console.log(req.params.id);
    //
    Image.find({user:imgId}).sort({created:-1}).limit(1).exec((err, image)=>{
        if (err) {
            console.log('error');
            res.sendStatus(400);
        }
        if(image == null ||image == ''){
            return;
        }
        // stream the image back by loading the file
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join('uploads', image[0].filename)).pipe(res);
    })

    // Image.findOne({user:imgId},(err,image)=>{
    //     if (err) {
    //         console.log('error');
    //         res.sendStatus(400);
    //     }
    //     if(image == null ||image == ''){
    //         return;
    //     }
    //     // stream the image back by loading the file
    //     res.setHeader('Content-Type', 'image/jpeg');
    //     fs.createReadStream(path.join('uploads', image.filename)).pipe(res);
    // })
 
    // Image.findById(imgId, (err, image) => {
    //     if (err) {
    //         console.log('error');
    //         res.sendStatus(400);
    //     }
    //     // stream the image back by loading the file
    //     res.setHeader('Content-Type', 'image/jpeg');
    //     fs.createReadStream(path.join('uploads', image.filename)).pipe(res);
    // })
});
routes.put('/images/:id',upload.single('file'), (req, res) => {
    let userId = req.params.id;
    // res.send(req.file.filename);

    // res.send(userId);
    let newImage = new Image();
    newImage.user = userId;
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


  });

  routes.put('/reviewimages/:id',upload.single('file'), (req, res) => {
    let review_Id = req.params.id;
    // res.send(req.file.filename);

    // res.send(userId);
    let newImage = new reviewImage();
    newImage.review_id = review_Id;
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


  });
 
module.exports = routes;