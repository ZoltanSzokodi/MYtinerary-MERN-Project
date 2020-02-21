const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  itineraryTitle: {
    type: String,
    trim: true,
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
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('comment', commentSchema);
