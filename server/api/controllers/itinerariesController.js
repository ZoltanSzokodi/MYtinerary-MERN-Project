const Itinerary = require('../models/itineraryModel');
const City = require('../models/cityModel');
const appError = require('../../utils/appError');

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

exports.postItinerary = async (req, res) => {
  try {
    const city = await City.findOne({ name: req.body.name });

    !city && appError('City not found', 400);

    const itinerary = await Itinerary.findOne({ title: req.body.title });

    itinerary && appError('This itinerary title is already taken');

    let newItinerary = await Itinerary.create(req.body);
    const response = {
      message: 'Itinerary successfuly added!',
      newItinerary
    }
    res.status(201).json(response);
  }
  catch (error) {
    res.status(error.status || 500).json(error);
  }
};

exports.deleteItinerary = async (req, res) => {
  try {
    const itineraryId = await Itinerary.findByIdAndDelete(req.body.id);

    !itineraryId && appError('Invalid id number', 400);

    res.status(200).json({ message: `Itinerary succesfuly removed` });
  }
  catch (error) {
    res.status(error.status || 500).json(error);
  }
};

exports.updateItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
      omitUndefined: true,
      runValidators: true,
    });

    !itinerary && appError('Invalid id number', 400);

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