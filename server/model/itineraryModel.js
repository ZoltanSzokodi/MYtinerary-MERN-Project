const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  pictureURL: {
    type: String
  },
  rating: {
    type: Number
  },
  duration: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    required: true
  },
  hashTags: {
    type: String
  }
});

module.exports = mongoose.model('itinerary', itinerarySchema);