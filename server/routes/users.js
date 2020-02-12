const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const appError = require('../utils/appError');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const secret = require('../keys').secret;

// GET all users -------------------------------------
router.get('/all',
  async (req, res) => {
    try {
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
  });

// CREATE a new user ---------------------------------
router.post('/signup',
  async (req, res) => {
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
          // err && res.status(500).json(err);
          err && appError('bcrypt error', 500);

          const user = new User({
            username,
            password: hash,
            email,
            firstName,
            lastName,
            userImg
          });

          await user.save()
          const response = {
            message: 'User successfuly created!',
            newUser: user.username
          };
          res.status(201).json(response);
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
  });

// LOG IN user -------------------------------------------
router.post('/login',
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      !validator.isLength(username, { min: 1, max: undefined })
        && appError('Please enter your username', 400);
      !validator.isLength(password, { min: 1, max: undefined })
        && appError('Please enter your password', 400);
      !user && appError('Authentication failed', 401);

      bcrypt.compare(password, user.password, (err, result) => {
        try {
          if (err) { appError('Authentication failed', 401) }

          if (result) {
            const payload = {
              id: user._id,
              role: user.role,
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
  });

module.exports = router;