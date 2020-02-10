const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'You must add a username'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'You must add a password'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'You must add your email'],
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: [true, 'Please enter your first name'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your last name'],
    trim: true
  },
  userImg: {
    type: String
  }
});

module.exports = mongoose.model('user', userSchema);