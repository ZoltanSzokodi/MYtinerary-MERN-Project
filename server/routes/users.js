const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const appError = require('../utils/appError');
const bcrypt = require('bcrypt');

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
      const username = await User.findOne({ username: req.body.username });
      const email = await User.findOne({ email: req.body.email });

      username && appError('This username is already taken', 409);
      email && appError('This email is already taken', 409);

      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        try {
          // err && res.status(500).json(err);
          err && appError('bcrypt error', 500);

          const user = new User({
            username: req.body.username,
            password: hash,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userImg: req.body.userImg
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

module.exports = router;