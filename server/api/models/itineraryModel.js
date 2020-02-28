const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'required']
  },
  title: {
    type: String,
    trim: true,
    required: [true, 'required'],
    unique: true
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'required, between 10 and 250 characters'],
    maxlength: [250, 'max 250 characters'],
    minlength: [50, 'min 50 characters']
  },
  username: {
    type: String,
    trim: true,
    required: [true, 'required']
  },
  userId: {
    type: String,
    required: [true, 'required']
  },
  userImg: {
    type: String,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'required'],
    min: [1, 'Minimum 1'],
    max: [24, 'Max 24'],
  },
  price: {
    type: Number,
    required: [true, 'required']
  },
  hashTags: {
    type: Array,
    trim: true,
    required: [true, 'required'],
  },
  date: {
    type: Number,
    default: Date.now
  }
});

module.exports = mongoose.model('itinerary', itinerarySchema);