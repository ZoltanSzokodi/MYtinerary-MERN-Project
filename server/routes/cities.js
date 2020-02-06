const express = require('express');
const router = express.Router();
const cityModel = require('../model/cityModel');

// get all cities
router.get('/',
  async (req, res, next) => {
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
  async (req, res, next) => {
    try {
      const city = await cityModel.findOne({ name: req.body.name })

      if (city) {
        return res.status(403).send('This city already exists')
      }
      let newCity = new cityModel(
        {
          name: req.body.name,
          country: req.body.country,
          description: req.body.description,
          img: req.body.img
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

module.exports = router;
