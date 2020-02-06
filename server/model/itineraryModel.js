const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An itinerary must have a name!']
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  pictureURL: {
    type: String
  },
  duration: {
    type: Number,
    require: true
  },
  price: {
    type: Number,
    required: true
  },
  tourGuide: {
    type: String,
    required: true
  },
  hashTags: {
    type: String
  }
});

module.exports = mongoose.model('itinerary', itinerarySchema);