const express = require('express');
const router = express.Router();
const cityModel = require('../model/cityModel');

// get all cities
router.get('/all',
  (req, res) => {
    cityModel.find({})
      .then(files => {
        res.send(files)
      })
      .catch(err => console.log(err));
  });

// post a new itinerary
router.post('/',
  (req, res) => {
    const newCity = new cityModel(
      {
        name: req.body.name,
        country: req.body.country
      }
    )
    newCity.save()
      .then(city => {
        res.send(city)
      })
      .catch(err => {
        res.status(500).send('Server erroe')
      })
  });

module.exports = router;
