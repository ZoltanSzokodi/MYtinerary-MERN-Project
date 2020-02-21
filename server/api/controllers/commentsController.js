const Itinerary = require('../models/itineraryModel');
const Comment = require('../models/commentModel');
const appError = require('../../utils/appError');

// ================================================================

exports.getAllComments = async (req, res) => {
  try {
    !req.user.isLoggedin && appError('You need to log in to perform this action', 401);

    const comments = await Comment.find({});
    const response = {
      length: comments.length,
      comments
    };
    res.send(response);
  }
  catch (error) {
    res.status(500).json(error);
  }
};

// ===============================================================

exports.postComment = async (req, res) => {
  try {
    !req.user.isLoggedin && appError('You need to log in to perform this action', 401);

    const {
      itineraryTitle,
      comment
    } = req.body;

    const {
      username,
      userImg
    } = req.user;

    const itinerary = await Itinerary.findOne({ title: itineraryTitle });

    !itinerary && appError('Itinerary not fount', 400);

    let newComment = new Comment({
      itineraryTitle,
      username,
      userImg,
      comment
    });

    await newComment.save();

    const response = {
      message: 'Comment successfuly added!',
      newComment
    }
    res.status(201).json(response);
  }
  catch (error) {
    res.status(error.status || 500).json(error);
  }
};

// =========================================================

exports.getComments = async (req, res) => {
  try {

  }
  catch (error) {

  }
};