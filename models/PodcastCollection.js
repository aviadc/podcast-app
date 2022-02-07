const mongoose = require('mongoose');


const PodcastCollectionSchema = new mongoose.Schema({
  image:{
      type: Buffer
  }

});

module.exports = mongoose.model('PodcastCollection',PodcastCollectionSchema);