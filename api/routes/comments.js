const express = require('express');
const passport = require('passport');
const router = express.Router();

const CommentsController = require('../controllers/commentsController');

// GET all comments ==============================================
router.get('/all',
  CommentsController.getAllComments);

// POST a comment ================================================
router.post('/:itineraryId',
  passport.authenticate('jwt', { session: false }),
  CommentsController.postComment);

// DELETE comment ================================================
router.delete('/:commentId',
  passport.authenticate('jwt', { session: false }),
  CommentsController.deleteComment);

// GET comments for a specific itinerary =========================
// OUT OF USE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// I am using getAllComments instead and handling them on the client side
router.get('/:itineraryId',
  CommentsController.getComments);

module.exports = router;
