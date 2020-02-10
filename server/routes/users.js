const express = require('express');
const router = express.Router();
const userModel = require('../model/userModel');

// GET all users -------------------------------------
router.get('/',
  async (req, res, next) => {
    try {
      const allUsers = await userModel
        .find({});

      const response = {
        length: allUsers.length,
        users: allUsers
      };
      res.send(response);
    }
    catch (error) {
      console.log(error);
      const response = {
        message: 'Failed to fetch users',
        error
      };
      res.status(500).json(response);
    }
  });

// CREATE a new user ---------------------------------
router.post('/',
  async (req, res, next) => {
    try {
      const username = req.body.username;
      const user = await userModel
        .findOne({ username });

      if (user) {
        // throw new Error(`FAILED! '${cityName}' is already in the DB`);
        const error = new Error();
        error.status = 400;
        error.message = `FAILED! username: '${username}' is already taken`;
        next(error);
      }
      else {
        const email = req.body.email;
        const checkEmail = await userModel
          .findOne({ email });

        if (checkEmail) {
          const error = new Error();
          error.status = 400;
          error.message = `FAILED! email: '${email}' is already taken`;
          next(error);
        }
        else {
          let newUser = await userModel.create(req.body);
          const response = {
            message: 'User successfuly created!',
            createdUser: newUser.username
          };
          res.status(201).json(response);
        }
      }
    }
    catch (error) {
      console.log(error.message)
      const response = {
        message: error.message
      };
      res.status(400).json(response);
    }
  });

module.exports = router;