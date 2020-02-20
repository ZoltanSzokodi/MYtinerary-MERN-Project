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

// JWT - LOGIN user =========================================
router.post('/login',
  UsersController.loginUser);

// GOOGLE - LOGIN ===========================================
router.get('/google',
  passport.authenticate('google', {
    scope: ["profile", "email"],
  }));

// GOOGLE - REDIRECT ========================================
router.get('/google/redirect',
  passport.authenticate('google', { session: false }),
  UsersController.googleAuth);

// LOGOUT user ==============================================
router.get('/logout',
  passport.authenticate('jwt', { session: false }),
  UsersController.logoutUser);

// DELETE user ==============================================
router.delete('/',
  passport.authenticate('jwt', { session: false }),
  UsersController.deleteUser);

// UPDATE a user ============================================
router.patch('/',
  passport.authenticate('jwt', { session: false }),
  UsersController.updateUser);

// GET FAVS ================================================
router.get('/getFavs',
  passport.authenticate('jwt', { session: false }),
  UsersController.getFavs);

// TOGGLE FAVS ==============================================
// router.post('/toggleFavs',
//   passport.authenticate('jwt', { session: false }),
//   UsersController.toggleFavs);


module.exports = router;