const User = require('../models/userModel');
// const Itinerary = require('../models/itineraryModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const secret = require('../../keys').JWT_SECRET;
const appError = require('../../utils/appError');

// ================================================================

exports.getAllUsers = async (req, res) => {
  try {
    !req.user.isLoggedin && appError('You need to log in to perform this action', 401);

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
      // isAdmin, ==================================
      // This would be a security issue - nobody should be able to sign up as admin. It has to be granted manually in the DB ===========================
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
          // isAdmin,
          isLoggedin: true,
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

    bcrypt.compare(password, user.password, async (err, result) => {
      try {
        if (err) { appError('Authentication failed', 401) }

        if (result) {
          user.isLoggedin = true;
          await user.save();

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

exports.logoutUser = async (req, res) => {
  try {
    !req.user.isLoggedin && appError('You need to log in to perform this action', 401);

    const user = await User.findById({ _id: req.user.id });

    user.isLoggedin = false;

    await user.save();

    res.status(200).json({ message: 'You are logged out' })
  }
  catch (error) {
    res.status(error.status || 500).json(error);
  }
}

// ================================================================

exports.deleteUser = async (req, res) => {
  try {
    !req.user.isLoggedin && appError('You need to log in to perform this action', 401);

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
    !req.user.isLoggedin && appError('You need to log in to perform this action', 401);

    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      omitUndefined: true,
      runValidators: true,
      useFindAndModify: false
    });

    console.log(req.body)

    const response = {
      message: 'User successfuly updated!',
      updatedUser: {
        username: user.username,
        email: user.email,
        userImg: user.userImg,
        favoriteItineraries: user.favoriteItineraries
      }
    };
    res.status(200).json(response);
  }
  catch (error) {
    console.log(error)
    res.status(error.status || 500).json(error.message);
  }
};

// ==================================================================
// FAVORITES

exports.getFavs = async (req, res) => {
  try {
    !req.user.isLoggedin && appError('You need to log in to perform this action', 401);
    // find and return all favorite itineraries of a logged in user
    const user = await User.findById({ _id: req.user.id });

    const { favoriteItineraries } = user;

    const response = {
      length: favoriteItineraries.length,
      favoriteItineraries
    };

    res.status(200).json(response);
  }
  catch (error) {
    console.log(error)
    res.status(error.status || 500).json(error.message);
  }
};

// =================================================================

// exports.toggleFavs = async (req, res) => {
//   try {
//     // !req.user.isLoggedin && appError('You need to log in to perform this action', 401);
//     const { itineraryId } = req.body;
//     const user = await User.findById({ _id: req.user.id });
//     const itinerary = await Itinerary.findById({ _id: itineraryId })
//     const { favoriteItineraries } = user;

//     !itinerary && appError('Invalidid number', 400);

//     if (favoriteItineraries.includes(itineraryId)) {
//       // remove from favorites
//       const index = favoriteItineraries.indexOf(itineraryId);
//       favoriteItineraries.splice(index, 1);
//     }
//     else {
//       // add to favorites
//       favoriteItineraries.push(itineraryId);
//     }
//     await user.save();

//     res.status(200).json({ message: 'Success' });
//   }
//   catch (error) {
//     console.log(error)
//     res.status(error.status || 500).json(error.message);
//   }
// };

// =================================================================

// exports.removeFromFavs = async (req, res) => {
//   try {

//   }
//   catch (error) {
//     console.log(error)
//     res.status(error.status || 500).json(error.message);
//   }
// };