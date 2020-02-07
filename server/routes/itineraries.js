const express = require('express');
const router = express.Router();
const itineraryModel = require('../model/itineraryModel');
const cityModel = require('../model/cityModel');

// GET itineraries for a city -------------------
router.get('/:name',
  async (req, res, next) => {
    try {
      const cityName = req.params.name;
      const city = await cityModel.findOne({ name: cityName });

      if (!city) {
        throw new Error(`FAILED! City named '${cityName}' is not in the DB`);
      }

      const itineraries = await itineraryModel
        .find({ name: cityName });

      const response = {
        length: itineraries.length,
        itineraries: itineraries
      };
      res.status(200).send(response);
    }
    catch (error) {
      console.log(error)
      const response = {
        message: error.message
      }
      res.status(500).json(response);
    }
  });

// POST a new itinerary ------------------------------------
router.post('/',
  async (req, res, next) => {
    try {
      const itineraryTitle = req.body.title;
      const itinerary = await itineraryModel
        .findOne({ title: itineraryTitle });

      if (itinerary) {
        throw new Error(`FAILED! Itinerary title '${itineraryTitle}' already exists in DB`);
      }

      let newItinerary = await itineraryModel.create(req.body);

      const response = {
        message: 'Itinerary successfuly added!',
        createdCity: newItinerary
      }
      res.status(201).json(response);
    }
    catch (error) {
      console.log(error)
      const response = {
        message: error.message
      }
      res.status(500).json(response);
    }
  });

// DELETE an itinerary ------------------------------------
router.delete('/',
  async (req, res, next) => {
    try {
      const id = req.body.id;
      const deleteItinerary = await itineraryModel.findByIdAndDelete(id);

      if (!deleteItinerary) {
        throw new Error(`FAILED! No itinerary found with id number: '${id}'`);
      }

      const response = {
        message: `Itinerary with id: "${id}" removed`,
      };
      res.status(200).json(response);
    }
    catch (error) {
      console.log(error)
      const response = {
        message: error.message
      }
      res.status(500).json(response);
    }
  });

// UPDATE an itinerary -----------------------------------
router.patch('/',
  async (req, res, next) => {
    try {
      const id = req.body.id;
      const updateItinerary = await itineraryModel.findByIdAndUpdate(id, req.body, {
        new: true,
        omitUndefined: false,
        runValidators: true
      });

      if (!updateItinerary) {
        throw new Error(`FAILED! No itinerary found with id number: '${id}'`);
      }

      const response = {
        message: 'Itinerary updated',
        updatedCity: updateItinerary
      };
      res.status(200).json(response);
    }
    catch (error) {
      console.log(error)
      const response = {
        message: error.message
      }
      res.status(500).json(response);
    }
  });

module.exports = router;
