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

.delete('/:collectionId/:podcastId/podcast',async (req,res)=>{
  try{
      console.log(req.params);
      const podcastList = await PodcastCollection.findOne({_id: req.params.collectionId});
      newPodcastList = await Promise.all(podcastList.podcasts.filter((podcast)=>{
        return podcast._id.toString()!==req.params.podcastId.toString();
      }))
      console.log(podcastList,"before");
      console.log(newPodcastList,"after");
      podcastList.podcasts = [...newPodcastList];
      podcastList.save();
      // const podcastList = await PodcastCollection.deleteOne({_id: req.params.id})
     
      res.send(podcastList);
   
  }catch(e){
      res.status(404).send(e.message)
  }

})


module.exports = router