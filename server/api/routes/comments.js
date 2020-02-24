const express = require('express');
const passport = require('passport');
const router = express.Router();

const CommentsController = require('../controllers/commentsController');

// GET all comments ==============================================
// only for testing
router.get('/all',
  passport.authenticate('jwt', { session: false }),
  CommentsController.getAllComments);

// POST a comment ================================================
router.post('/:itineraryId',
  passport.authenticate('jwt', { session: false }),
  CommentsController.postComment);

// GET comments for a specific itinerary
router.get('/:itineraryId',
  CommentsController.getComments);

module.exports = router;
