const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  // provider: {
  //   type: String,
  //   required: true,
  //   enum: ['jwt', 'google']
  // },
  isOAuth: {
    type: Boolean,
    required: true,
    // default: false
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
    // required: [true, 'Required'],
    required: function () {
      return this.isOAuth ? false : true;
    },
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