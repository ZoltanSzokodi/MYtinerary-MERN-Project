const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  itineraryId: {
    type: String,
    required: [true, 'required']
  },
  itineraryTitle: {
    type: String,
    trim: true,
    required: [true, 'required']
  },
  userId: {
    type: String,
    required: [true, 'required']
  },
  username: {
    type: String,
    trim: true,
    required: [true, 'required']
  },
  userImg: {
    type: String
  },
  comment: {
    type: String,
    required: [true, 'required']
  },
  date: {
    type: Number,
    default: Date.now
  }
});

module.exports = mongoose.model('comment', commentSchema);
