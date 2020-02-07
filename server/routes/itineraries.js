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
      // check if city exists in the DB
      if (!city) {
        const error = new Error('City not found');
        error.status = 404;
        next(error);
      }
      // if the city exists check for its itineraries
      const itineraries = await itineraryModel
        .find({ name: cityName })
      const response = {
        length: itineraries.length,
        itineraries: itineraries
      };
      res.send(response)
    }
    catch (err) {
      console.log(err);
      // res.status(500).send("Server error");
      res.status(500).json({ error: err });
    }
  });

// POST a new itinerary
router.post('/',
  async (req, res, next) => {
    try {
      const itinerary = await itineraryModel
        .findOne({ title: req.body.title });

      if (itinerary) {
        const error = new Error('This itinerary already exists');
        error.status = 403;
        next(error);
      }

      let newItinerary = await itineraryModel.create(req.body);

      const response = {
        message: 'Itinerary successfuly added!',
        createdCity: newItinerary
      }
      res.status(201).json(response);
    }
    catch (err) {
      console.log(err)
      // res.status(500).send("Server error");
      res.status(500).json({ error: err });
    }
  });

// DELETE an itinerary ------------------------------------
router.delete('/',
  async (req, res, next) => {
    try {
      const id = req.body.id;
      await itineraryModel.findByIdAndDelete(id);

      res.json({ message: 'Itinerary deleted' });
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  });


module.exports = router;
