const { string } = require('joi');
const mongoose = require('mongoose');

const PodcastCommentSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

})

const podcastItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  audioLink: {
    type: String,
    required: true,
  },
  comments: {
    type:[PodcastCommentSchema]
  },

})


const PodcastCollectionSchema = new mongoose.Schema({
  user:{
    type: mongoose.ObjectId,
    required:true,
  },
  image:{
      type: Buffer
  },
  podcasts:{
    type: [podcastItemSchema],
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