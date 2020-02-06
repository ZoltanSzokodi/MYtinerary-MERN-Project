const express = require('express');
const router = express.Router();
const itineraryModel = require('../model/itineraryModel');
const cityModel = require('../model/cityModel');


// get a specific city's itineraries
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
  }
);

module.exports = router;
