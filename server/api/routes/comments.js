const express = require('express');
const passport = require('passport');
const router = express.Router();

const CommentsController = require('../controllers/commentsController');

// GET all comments ==============================================
router.get('/all',
  passport.authenticate('jwt', { session: false }),
  CommentsController.getAllComments);

// POST a comment ================================================
router.post('/',
  passport.authenticate('jwt', { session: false }),
  CommentsController.postComment);

// GET comments for a specific itinerary
// router.get('/',
//   passport.authenticate('jwt', { session: false}),
//   CommentsController.getComments);

module.exports = router;
