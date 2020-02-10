const express = require('express');
const router = express.Router();
const userModel = require('../model/userModel');

// image uploading
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
});
const limits = {
  fileSize: 1024 * 1024 * 2
};
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
};


const upload = multer({ storage, limits, fileFilter });

// CREATE a new user ---------------------------------
router.post('/', upload.single('userImage'),
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
          let newUser = await userModel.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userImage: req.file.path
          });
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