const express = require('express');
const router = express.Router();
const Itinerary = require('../model/itineraryModel');
const City = require('../model/cityModel');
const appError = require('../../utils/appError');

// GET itineraries for a city -------------------
router.get('/:name',
  async (req, res) => {
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
  });

// POST a new itinerary ------------------------------------
router.post('/',
  async (req, res) => {
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
  });

// DELETE an itinerary ------------------------------------
router.delete('/',
  async (req, res) => {
    try {
      const itineraryId = await Itinerary.findByIdAndDelete(req.body.id);

      !itineraryId && appError('Invalid id number', 400);

      res.status(200).json({ message: `Itinerary succesfuly removed` });
    }
    catch (error) {
      res.status(error.status || 500).json(error);
    }
  });

// UPDATE an itinerary -----------------------------------
router.patch('/',
  async (req, res) => {
    try {
      const itinerary = await Itinerary.findByIdAndUpdate(req.body.id, req.body, {
        new: true,
        omitUndefined: false,
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
  });

module.exports = router;
