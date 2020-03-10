const Itinerary = require('../models/itineraryModel');
const Comment = require('../models/commentModel');
const appError = require('../../utils/appError');

// ================================================================

exports.getAllComments = async (req, res) => {
  try {
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
      id,
      username,
      userImg
    } = req.user;

    const itinerary = await Itinerary.findOne({ _id: req.params.itineraryId });

    !itinerary && appError('Itinerary not fount', 400);

    let newComment = new Comment({
      itineraryId: req.params.itineraryId,
      itineraryTitle,
      userId: id,
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
// OUT OF USE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// this controller gets the comments for a specified itinerary
// on the client side I am fetching all the comments for all itineraries and distributing them according to their 'itineraryId' property

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ itineraryId: req.params.itineraryId });

    const response = {
      length: comments.length,
      comments
    };

    res.send(response);
  }
  catch (error) {
    res.status(error.status || 500).json(error);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    !req.user.isLoggedin && appError('You need to log in to perform this action', 401);

    let comment = await Comment.findOne({ _id: req.params.commentId });

    !comment && appError('Invalid id number', 400);
    comment.userId != req.user.id && appError('unauthorized', 403);

    await Comment.findByIdAndDelete(req.params.commentId);

    res.status(200).json({ message: `Comment succesfuly removed` });
  }
  catch (error) {
    res.status(error.status || 500).json(error);
    console.log(error)
  }
};