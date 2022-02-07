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


router.post('/:id/upload/image',uploadImage.single('image'),async (req,res)=>{
    console.log('im in post express')
    try{
        const buffer = await sharp(req.file.buffer).resize({
            width: 250,
            height: 250
        }).toBuffer();
        const imgUpdate = await PodcastCollection.findOneAndUpdate({_id:req.params.id},{image: buffer},{new:true});
        res.send(imgUpdate);
     
    }catch(e){
        res.status(404).send(e.message)
    }
  },(error,req,res,next)=>{
    res.status(409).send({ error: error.message })
  })

  .post('/:id/upload/audio',upload.array('audio',10),async (req,res)=>{
      console.log(req.params);
    //   const arr = [];
      try{
         const arr = await Promise.all(req.files.map(async (file)=>{
            const link = await uploadAudio(file.originalname,bucket,file.buffer);
            return link.Location;
        })); 
        res.send(arr);
        //   console.log('data');
      }catch(e){
          console.log('error')
          res.send(e);
      }
  },(error,req,res,next)=>{
    res.status(409).send({ error: error.message })
  })

    .post('/:id/upload/title',async(req,res)=>{
        try{
            const collection = new PodcastCollection({user: req.params.id,title:req.body.title});
            const data = await collection.save()
            res.send(data);
        }catch(e){
            res.status(400).send(e);
        }
  })
  
  
  
   
  module.exports = router
