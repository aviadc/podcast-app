const router = require('express').Router();
const { PodcastCollection, PodcastItem } = require('../models/PodcastCollection');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
})

// const params = {
//   Bucket: process.env.BUCKET_NAME,
//   Delete: {
//     Objects: [
//       {
//         Key: "objectkey1"
//       },
//       {
//         Key: "objectkey2"
//       }
//     ],
//     Quiet: false
//   }
// };

// s3.deleteObjects(params, function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else console.log(data);           // successful response
// });


router.delete('/:id/collection', async (req, res) => {
  try {
    const collection = await PodcastCollection.findById(req.params.id);
    const ObjectsToDelete = [{ Key: collection.imgStorageKey }];
    collection.podcasts.forEach((podcast) => {
      ObjectsToDelete.push({ Key: podcast.podcastStorageKey })
    })
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Delete: {
        Objects: ObjectsToDelete
      }
    }
    s3.deleteObjects(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data);           // successful response
    });
    const podcastList = await PodcastCollection.deleteOne({ _id: req.params.id })
    res.send(podcastList);
  } catch (e) {
    res.status(404).send(e.message)
  }

})

  .delete('/:collectionId/:podcastId/podcast', async (req, res) => {
    try {
      const collection = await PodcastCollection.findOne({ _id: req.params.collectionId });
      newPodcastList = await Promise.all(collection.podcasts.filter((podcast) => {
        return podcast._id.toString() !== req.params.podcastId.toString();
      }))
      const podcastToDelete = collection.podcasts.find(podcast => podcast._id.toString() === req.params.podcastId.toString())
      collection.podcasts = [...newPodcastList];
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Delete: {
          Objects: [{ Key: podcastToDelete.podcastStorageKey }]
        }
      }
      s3.deleteObjects(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
      });
      s3.headObject({ Bucket: process.env.BUCKET_NAME, Key: podcastToDelete.podcastStorageKey }, async (err, data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else {
          await collection.updateOne({ $inc: { "size": -data.ContentLength } });
          await collection.save();
          res.send({ deletedPodcastSize: data.ContentLength });
        }
      });
    } catch (e) {
      res.status(404).send(e.message)
    }

  })


module.exports = router