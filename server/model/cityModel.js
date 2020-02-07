const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'A city must have a name'],
    unique: true
  },
  country: {
    type: String,
    trim: true,
    required: [true, 'The county of origin must be defined']
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Please add a short description between 50 and 250 characters'],
    maxlength: [250, 'The maximum length of the description is 250 chars'],
    minlength: [50, 'The minimum length of the description is 50 chars']
  },
  img: {
    type: String,
    trim: true,
    required: [true, 'A city must have a cover image']
  }
});

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model('city', citySchema);