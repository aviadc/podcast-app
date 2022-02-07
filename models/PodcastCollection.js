const mongoose = require('mongoose');


const PodcastCollectionSchema = new mongoose.Schema({
  image:{
      type: Buffer
  },
  podcasts:{
    type: [{name: String,audio: String,image: Buffer}],
  },
  title: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('PodcastCollection',PodcastCollectionSchema);