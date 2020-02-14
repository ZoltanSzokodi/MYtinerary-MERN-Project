const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validator = require('validator');
const router = express.Router();
const User = require('../model/userModel');
const secret = require('../../keys').secret;
const appError = require('../../utils/appError');

// GET all users ========================================
router.get('/all',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
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
  });

// CREATE a new user ======================================
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
          err && appError('bcrypt error', 500);

          const user = new User({
            username,
            password: hash,
            email,
            firstName,
            lastName,
            userImg,
            date: Date.now()
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
  });

// LOGIN user ==============================================
router.post('/login',
  async (req, res) => {
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
  });

// DELETE user ==============================================
router.delete('/',
  async (req, res) => {
    try {
      const userId = await User.findByIdAndDelete(req.body.id);

      !userId && appError('Invalid id number', 400);

      res.status(200).json({ message: 'User successfuly deleted' });
    }
    catch (error) {
      res.status(error.status || 500).json(error);
    }
  });

// UPDATE a user ==============================================
router.patch('/',
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.body.id, req.body, {
        new: true,
        omitUndefined: false,
        runValidators: true,
      });

      !user && appError('Invalid id number', 400);

      const response = {
        message: 'User successfuly updated!',
        updatedUser: {
          username: user.username,
          email: user.email,
          userImg: user.userImg
        }
      };
      res.json(response);
    }
    catch (error) {
      res.status(error.status || 500).json(error);
    }
  });

module.exports = router;