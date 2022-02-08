const mongoose = require('mongoose');


const PodcastCollectionSchema = new mongoose.Schema({
  user:{
    type: mongoose.ObjectId,
    required:true,
  },
  image:{
      type: Buffer
  },
  podcasts:{
    type: Array,
  },
  title: {
    type: String,
    required: true,
  },
  details:{
    type: String
  }
});

module.exports = mongoose.model('PodcastCollection',PodcastCollectionSchema);