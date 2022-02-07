const router = require('express').Router();
const PodcastCollection = require('../models/PodcastCollection');
const multer = require('multer');
const sharp = require('sharp');

const upload = multer({
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


router.post('/upload/image',upload.single('image'),async (req,res)=>{

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
   
//    const user = new User({
//      name: req.body.name,
//      email: req.body.email,
//      password: hashedPassword
//    });
//    try{
//      const savedUser = await user.save();
//      res.status(201).send(savedUser);
//    } catch(e){
//      res.status(400).send(e.message)
//    }             
  
  },(error,req,res,next)=>{
    res.status(409).send({ error: error.message })
  })
  
  
  module.exports = router
