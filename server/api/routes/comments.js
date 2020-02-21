const express = require('express');
const passport = require('passport');
const router = express.Router();

const CommentsController = require('../controllers/commentsController');

// GET all comments ==============================================
router.get('/all',
  passport.authenticate('jwt', { session: false }),
  CommentsController.getAllComments);

// Post a comment ================================================
router.post('/',
  passport.authenticate('jwt', { session: false }),
  CommentsController.postComment);

module.exports = router;
