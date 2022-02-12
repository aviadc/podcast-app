const router = require('express').Router();
const {PodcastCollection,PodcastItem} = require('../models/PodcastCollection');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');


router.delete('/:id/collection',async (req,res)=>{
  try{
      const podcastList = await PodcastCollection.deleteOne({_id: req.params.id})
     
      res.send(podcastList);
   
  }catch(e){
      res.status(404).send(e.message)
  }

})

.delete('/:colectionId/:podcastsId/podcast',async (req,res)=>{
  try{
      console.log(req.params);
      
      // const podcastList = await PodcastCollection.deleteOne({_id: req.params.id})
     
      // res.send(podcastList);
   
  }catch(e){
      res.status(404).send(e.message)
  }

})


module.exports = router