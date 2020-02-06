const express = require('express');
const router = express.Router();
const itineraryModel = require('../model/itineraryModel')

// get a specific city's itineraries
router.get('/:name',
  async (req, res, next) => {
    try {
      const cityName = req.params.name;
      const itinerary = await itineraryModel.find({ name: cityName })
      res.send(itinerary)
    }
    catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
