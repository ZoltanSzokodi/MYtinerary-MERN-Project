const express = require('express');
const router = express.Router();
const cityModel = require('../model/cityModel');

// get all cities
router.get('/all',
  async (req, res) => {
    try {
      const allCities = await cityModel.find({})
      res.send(allCities)
    }
    catch (err) {
      console.log(err);
    }
  });

// post a new city
router.post('/',
  async (req, res) => {
    try {
      const city = await cityModel.findOne({ name: req.body.name })

      if (city) {
        return res.status(403).send('This city already exists')
      }
      let newCity = new cityModel(
        {
          name: req.body.name,
          country: req.body.country
        }
      )
      newCity = await newCity.save()
      res.send(newCity)
    }
    catch (err) {
      console.log(err)
      res.status(500).send("Server error");
    }
  });

router.get('/:name',
  async (req, res) => {
    try {
      const cityRequested = req.params.name;
      const city = await cityModel.findOne({ name: cityRequested })
      if (!city) {
        return res.status(404).send('City not found')
      }
      res.send(city)
    }
    catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
