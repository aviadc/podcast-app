const router = require('express').Router();
const {PodcastCollection,PodcastItem} = require('../models/PodcastCollection');



router.get('/:id/podcasts',async (req,res)=>{
    try{
        const podcastList = await PodcastCollection.find({user: req.params.id})
       
        res.send(podcastList);
     
    }catch(e){
        res.status(404).send(e.message)
    }
  
 })

 .get('/podcasts', async (req,res)=>{
    try{
        const podcastList = await PodcastCollection.find();
        res.send(podcastList);
     
    }catch(e){
        res.status(404).send(e.message)
    }
 })
 .get('/test',async (req,res)=>{
    console.log('in server get test');
    try{
        res.status(200).send('server connection get ok');
     
    }catch(e){
        res.status(404).send(e.message)
    }
 })
 .post('/test',async (req,res)=>{
    try{
        res.status(200).send('server connection post ok');
     
    }catch(e){
        res.status(404).send(e.message)
    }
 })
  
  
  
   
  module.exports = router
