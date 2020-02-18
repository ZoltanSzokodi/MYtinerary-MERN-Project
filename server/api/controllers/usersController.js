const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const secret = require('../../keys').JWT_SECRET;
const appError = require('../../utils/appError');

// ================================================================

exports.getAllUsers = async (req, res) => {
  try {
    // 'username userImg'
    const users = await User.find({});
    const response = {
      length: users.length,
      users: users
    };
    res.send(response);
  }
  catch (error) {
    res.status(500).json(error);
  }
};

// ================================================================

exports.googleAuth = (req, res) => {
  try {
    const {
      _id,
      isAdmin,
      username,
      userImg } = req.user;

    const payload = {
      id: _id,
      isAdmin,
      username,
      userImg
    }
    const options = {
      // expiresIn: 86400
      expiresIn: 2592000
    };
    const token = jwt.sign(payload, secret, options);

    const resToken = "?code=" + token;
    res.redirect('http://localhost:3000/' + resToken);
  }
  catch (error) {
    console.log(error);
    res.status(error.status || 500).json(error);
  }
};

// ================================================================

exports.signupUser = async (req, res) => {
  try {
    const {
      username,
      password,
      passwordConfirm,
      email,
      firstName,
      lastName,
      userImg } = req.body;

    const usernameTaken = await User.findOne({ username });
    const emailTaken = await User.findOne({ email });

    // Validation
    usernameTaken
      && appError('This username is already taken', 409);
    emailTaken
      && appError('This email is already taken', 409);
    !validator.isLength(password, { min: 8, max: 30 })
      && appError('Password minimum 8 characters', 400);
    !validator.equals(password, passwordConfirm)
      && appError('Passwords are not the same', 400);

    bcrypt.hash(password, 10, async (err, hash) => {
      try {
        err && appError('bcrypt error', 500);

        const user = new User({
          username,
          password: hash,
          email,
          firstName,
          lastName,
          userImg
        });

        await user.save();

        const payload = {
          id: user._id,
          isAdmin: user.isAdmin,
          username: user.username,
          userImg: user.userImg
        };
        const options = {
          expiresIn: 2592000
        };
        const token = jwt.sign(payload, secret, options);

        res.status(201).json({ message: 'User successfuly created', token });
      }
      catch (error) {
        res.status(error.status || 500).json(error)
      }
    });
  }
  catch (error) {
    console.log(error);
    res.status(error.status || 500).json(error);
  }
};

// ================================================================

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    !validator.isLength(email, { min: 1, max: undefined })
      && appError('Please enter your email', 400);
    !validator.isEmail(email)
      && appError('Please enter a valid email', 400);
    !validator.isLength(password, { min: 1, max: undefined })
      && appError('Please enter your password', 400);
    !user && appError('Authentication failed', 401);

    bcrypt.compare(password, user.password, (err, result) => {
      try {
        if (err) { appError('Authentication failed', 401) }

        if (result) {
          const payload = {
            id: user._id,
            isAdmin: user.isAdmin,
            username: user.username,
            userImg: user.userImg
          };
          const options = {
            expiresIn: 2592000
          }
          const token = jwt.sign(payload, secret, options);

          res.status(200).json({ message: 'Authentication successful', token })
        }
        else { appError('Authentication failed', 401) }
      }
      catch (error) {
        res.status(error.status || 500).json(error)
      }
    });
  }
  catch (error) {
    console.log(error)
    res.status(error.status || 500).json(error);
  }
};

// ================================================================

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({ message: 'User successfuly deleted' });
  }
  catch (error) {
    res.status(error.status || 500).json(error);
  }
};

// ================================================================

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      omitUndefined: true,
      runValidators: true,
    });

    const response = {
      message: 'User successfuly updated!',
      updatedUser: {
        username: user.username,
        email: user.email,
        userImg: user.userImg
      }
    };
    res.status(200).json(response);
  }
  catch (error) {
    console.log(error)
    res.status(error.status || 500).json(error.message);
  }
};