const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'An itinerary must have a name']
  },
  title: {
    type: String,
    trim: true,
    required: [true, 'An itinerary must have a title'],
    unique: true
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Please add a short description between 50 and 250 characters'],
    maxlength: [250, 'The maximum length of the description is 250 chars'],
    minlength: [10, 'The minimum length of the description is 50 chars']
  },
  pictureURL: {
    type: String,
    trim: true
  },
  duration: {
    type: Number,
    require: [true, 'An itinerary must have a duration'],
    min: [1, 'Minimum 1'],
    max: [24, 'Max 24']
  },
  price: {
    type: Number,
    required: [true, 'An itinerary must have a price']
  },
  tourGuide: {
    type: String,
    trim: true,
    required: [true, 'Add tour guide\'s name']
  },
  hashTags: {
    type: String
  }
});

module.exports = mongoose.model('itinerary', itinerarySchema);