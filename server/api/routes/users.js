const express = require('express');
const passport = require('passport');
const router = express.Router();

const UsersController = require('../controllers/usersController');

// GET all users ========================================
router.get('/all',
  passport.authenticate('jwt', { session: false }),
  UsersController.getAllUsers);

// CREATE a new user ======================================
router.post('/signup',
  UsersController.signupUser);

// JWT - LOGIN user ==============================================
router.post('/login',
  UsersController.loginUser);



// GOOGLE - LOGIN
router.get('/google',
  passport.authenticate('google', {
    scope: ["profile", "email"],
  }));

// GOOGLE - REDIRECT
router.get('/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });




// DELETE user ==============================================
router.delete('/',
  passport.authenticate('jwt', { session: false }),
  UsersController.deleteUser);

// UPDATE a user ============================================
router.patch('/',
  passport.authenticate('jwt', { session: false }),
  UsersController.updateUser);

module.exports = router;