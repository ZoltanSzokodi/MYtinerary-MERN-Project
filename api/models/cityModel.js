const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'required'],
    unique: true
  },
  country: {
    type: String,
    trim: true,
    required: [true, 'required']
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'required, between 50 and 250 characters'],
    maxlength: [250, 'max 250 characters'],
    minlength: [50, 'min 50 characters']
  },
  img: {
    type: String,
    trim: true,
    required: [true, 'required']
  }
});

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model('city', citySchema);