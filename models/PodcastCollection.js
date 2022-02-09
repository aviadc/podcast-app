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

const PodcastItemSchema = new mongoose.Schema({
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
  imgUrl:{
      type: String
  },
  podcasts:{
    type: [PodcastItemSchema],
  },
  title: {
    type: String,
    required: true,
  },
  details:{
    type: String
  }
});

const PodcastCollection = mongoose.model('PodcastCollection',PodcastCollectionSchema);
const PodcastItem = mongoose.model('PodcastItem',PodcastItemSchema);
const PodcastComment = mongoose.model('PodcastComment',PodcastCommentSchema);

module.exports = {PodcastCollection,PodcastItem,PodcastComment}