const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'required'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'required'],
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    trim: true
  },
  firstName: {
    type: String,
    required: [true, 'required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'required'],
    trim: true
  },
  userImg: {
    type: String
  }
});

module.exports = mongoose.model('user', userSchema);