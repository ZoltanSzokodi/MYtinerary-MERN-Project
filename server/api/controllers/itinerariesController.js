const Itinerary = require('../models/itineraryModel');
const City = require('../models/cityModel');
const appError = require('../../utils/appError');

// ================================================================

exports.getItineraries = async (req, res) => {
  try {
    const city = await City.findOne({ name: req.params.name });

    !city && appError('City not found', 400);

    const itineraries = await Itinerary.find({ name: req.params.name });

    const response = {
      length: itineraries.length,
      itineraries
    };
    res.status(200).send(response);
  }
  catch (error) {
    res.status(error.status || 500).json(error);
  }
};

// ================================================================

exports.postItinerary = async (req, res) => {
  try {
    !req.user.isLoggedin && appError('You need to log in to perform this action', 401);
    // !req.user.isAdmin && appError('You are not authorized to add itineraries', 403);

    const {
      title,
      description,
      duration,
      price,
      hashTags
    } = req.body;

    const {
      username,
      userImg,
      id
    } = req.user;

    // const city = await City.findOne({ name: req.body.name });
    const city = await City.findOne({ name: req.params.city });

    !city && appError('City not found', 400);
    // hashTags.length < 5 && appError('Hashtags min length is 5 characters', 400);

    const itinerary = await Itinerary.findOne({ title: req.body.title });

    const hashTagsArr = [...hashTags.split(' ')];

    itinerary && appError('This itinerary title is already taken');

    let newItinerary = new Itinerary({
      name: req.params.city,
      title,
      username,
      userId: id,
      userImg,
      description,
      duration,
      price,
      hashTags: hashTagsArr
    });

    await newItinerary.save();

    const response = {
      message: 'Itinerary successfuly added!',
      newItinerary
    }
    res.status(201).json(response);
  }
  catch (error) {
    res.status(error.status || 500).json(error);
    console.log(error)
  }
};

// ================================================================

exports.deleteItinerary = async (req, res) => {
  try {
    !req.user.isLoggedin && appError('You need to log in to perform this action', 401);
    // !req.user.isAdmin && appError('You are not authorized to delete itineraries', 403);

    let itinerary = await Itinerary.findOne({ _id: req.params.itineraryId });

    !itinerary && appError('Invalid id number', 400);
    itinerary.userId != req.user.id && appError('unauthorized', 403);

    await Itinerary.findByIdAndDelete(req.params.itineraryId);

    res.status(200).json({ message: `Itinerary succesfuly removed` });
  }
  catch (error) {
    res.status(error.status || 500).json(error);
  }
};

// ================================================================

exports.updateItinerary = async (req, res) => {
  try {
    !req.user.isLoggedin && appError('You need to log in to perform this action', 401);
    // !req.user.isAdmin && appError('You are not authorized to update itineraries', 403);
    const {
      title,
      description,
      duration,
      price,
      hashTags
    } = req.body;

    const hashTagsArr = [...hashTags.split(' ')];

    let itinerary = await Itinerary.findOne({ _id: req.params.itineraryId });

    !itinerary && appError('Invalid id number', 400);
    itinerary.userId != req.user.id && appError('Unauthorized', 403);

    // let itineraryTitle = await Itinerary.findOne({ title });

    // itineraryTitle && appError('This title is already taken', 403);

    itinerary = await Itinerary.findByIdAndUpdate(req.params.itineraryId,
      {
        title,
        description,
        duration,
        price,
        hashTags: hashTagsArr
      },
      {
        new: true,
        omitUndefined: true,
        runValidators: true,
        useFindAndModify: false
      });

    const response = {
      message: 'Itinerary successfuly updated',
      updatedCity: itinerary
    };
    res.status(200).json(response);
  }
  catch (error) {
    res.status(error.status || 500).json(error);
  }
};