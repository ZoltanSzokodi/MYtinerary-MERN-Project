const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Required'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Required'],
    // select: false,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Required'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    trim: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    required: [true, 'required'],
    validate: [validator.isAlpha, 'Name must only contain A-Z/a-z characters'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'required'],
    validate: [validator.isAlpha, 'Name must only contain A-Z/a-z characters'],
    trim: true
  },
  userImg: {
    type: String,
    trim: true,
    default: null
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  favoriteItineraries: {
    type: Array
  },
  date: {
    type: Date
  }
});

module.exports = mongoose.model('user', userSchema);