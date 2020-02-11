const mongoose = require('mongoose');
const validator = require('validator');

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
    // minlength: [8, 'min 8 characters'],
    select: false,
    trim: true
  },
  // passwordConfirm: {
  //   type: String,
  //   required: [true, 'Please confirm your password'],
  //   validate: {
  //     // This only works on CREATE and SAVE!!!
  //     validator: function (el) {
  //       return el === this.password;
  //     },
  //     message: 'Passwords are not the same!'
  //   }
  // },
  email: {
    type: String,
    required: [true, 'required'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    trim: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    required: [true, 'required'],
    validate: [validator.isAlpha, 'name must only contain A-Z/a-z characters'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'required'],
    validate: [validator.isAlpha, 'name must only contain A-Z/a-z characters'],
    trim: true
  },
  userImg: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

module.exports = mongoose.model('user', userSchema);