const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  isOAuth: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isLoggedin: {
    type: Boolean,
    required: [true, 'Required']
  },
  googleId: {
    type: String
  },
  username: {
    type: String,
    required: [true, 'Required'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [function () {
      return this.isOAuth ? false : true;
    }, 'Required'],
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
    validate: [validator.isAscii, 'Name must only contain A-Z/a-z characters'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'required'],
    validate: [validator.isAscii, 'Name must only contain A-Z/a-z characters'],
    trim: true
  },
  userImg: {
    type: String,
    trim: true,
    default: null
  },
  favoriteItineraries: {
    type: Array,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('user', userSchema);