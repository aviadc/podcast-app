const router = require('express').Router();
const {PodcastCollection,PodcastItem} = require('../models/PodcastCollection');
const AWS = require('aws-sdk');
const multer = require('multer');
const sharp = require('sharp');
const storage = multer.memoryStorage();
const upload = multer({storage});
const dotenv = require('dotenv');
const { Promise } = require('mongoose');

let filesSize = 0;

dotenv.config();

const bucket = process.env.BUCKET_NAME;
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


const uploadImage =(filename,bucketname, file)=>{
    return new Promise((res,rej)=>{
        const params = {
            Key: filename,
            Bucket: bucketname,
            Body: file,
            ContentType: 'image/jpeg',
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

const uploadImageMulter = multer({
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




router.post('/:id/upload/image',uploadImageMulter.single('image'),async (req,res)=>{
    console.log('im in post express')
    try{
        const collection = await PodcastCollection.findById(req.params.id);
        console.log('after collection image server',req.file);
        const imageData = await uploadImage(`${collection.title}_${req.file.originalname}`,bucket,req.file.buffer);
        console.log("imageDataserver",imageData);
        filesSize+=req.file.size;
        console.log("image size server",filesSize);
        await collection.updateOne({imgUrl: imageData.Location, size: req.file.size, imgStorageKey: imageData.Key},{new:true});  
        res.status(200).send(collection);
    }catch(e){
        res.status(404).send(e.message)
    }
  },(error,req,res,next)=>{
    res.status(409).send({ error: error.message })
  })

  .post('/:id/upload/audio',upload.array('audio',10),async (req,res)=>{
      try{
        const collection = await PodcastCollection.findById(req.params.id);
        let filesSize = 0;
        await Promise.all(req.files.map(async (file)=>{
            const audioData = await uploadAudio(`${collection.title}_${file.originalname}`,bucket,file.buffer);
            console.log(`audioarrserver${Math.random()}`,audioData);
            filesSize+=file.size;
            console.log("audio size server",filesSize);
            collection.podcasts.push(new PodcastItem({title: audioData.Key,audioLink: audioData.Location,podcastStorageKey: audioData.Key}));
            await collection.updateOne({$inc: {"size": file.size}}); 
        }));
        console.log("audio size server",filesSize);
        await collection.save();
        res.status(200).send({collection,filesSize});
      }catch(err){
          console.log('error')
          res.status(400).send(err.message);
      }
  },(error,req,res,next)=>{
    res.status(409).send({ error: error.message })
  })

    .post('/:id/upload/title',async(req,res)=>{
        try{
            console.log("req body upload title",req.body)
            const duplicatTitle = await PodcastCollection.findOne({title: req.body.title});
            if(duplicatTitle){
                throw new Error('title error');
            }
            const collection = new PodcastCollection({user: req.params.id,title:req.body.title});
            const data = await collection.save()
            res.send(data);
        }catch(err){
            res.status(400).send(err.message);
        }
  })
  
  
  
   
  module.exports = router
