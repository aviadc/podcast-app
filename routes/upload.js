const router = require('express').Router();
const PodcastCollection = require('../models/PodcastCollection');
const AWS = require('aws-sdk');
const multer = require('multer');
const sharp = require('sharp');
const storage = multer.memoryStorage();
const upload = multer({storage});
const dotenv = require('dotenv');
const { Promise } = require('mongoose');

dotenv.config();

const bucket = 'aviadc-aws-bucket-1';
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID ,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})

const uploadAudio =(filename,bucketname, file)=>{
    return new Promise((res,rej)=>{
        const params = {
            Key: filename,
            Bucket: bucketname,
            Body: file,
            ContentType: 'audio/mpeg',
            ACL: 'public-read'
        }
       s3.upload(params,(err,data)=>{
               if(err){
                  rej(err);
               }else{
                   res(data);
               }
            })
    })
    
   
}

const uploadImage = multer({
    limits: {
        fileSize: 4000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})


router.post('/upload/image',uploadImage.single('image'),async (req,res)=>{
    console.log('im in post express')
    try{
        const buffer = await sharp(req.file.buffer).resize({
            width: 250,
            height: 250
        }).toBuffer();
        const img = new PodcastCollection({image: buffer});
        img.save();
        res.send('hey dude');
     
    }catch(e){
        res.status(404).send(e.message)
    }
  },(error,req,res,next)=>{
    res.status(409).send({ error: error.message })
  })

  .post('/upload/audio',upload.single('audio'),async (req,res)=>{
      try{
          const link = await uploadAudio('filename2',bucket,req.file.buffer);
          res.send(link);
      }catch(e){
          res.send(e);
      }
  })
  
  
  
   
  module.exports = router
