const express = require('express');
const router = express.Router();
const cityModel = require('../model/cityModel');

// GET all cities ----------------------------------
router.get('/',
  async (req, res, next) => {
    try {
      const allCities = await cityModel
        .find({})
        .select('name country description img'); // only the fields I need
      const response = {
        length: allCities.length,
        cities: allCities
      };
      res.send(response);
    }
    catch (err) {
      console.log(err);
      // res.status(500).send("Server error");
      res.status(500).json({ error: err });
    }
  });

// POST a new city ---------------------------------
router.post('/',
  async (req, res, next) => {
    try {
      const city = await cityModel.findOne({ name: req.body.name });

      if (city) {
        const error = new Error('This city already exists');
        error.status = 403;
        next(error);
      }

      let newCity = new cityModel({
        name: req.body.name,
        country: req.body.country,
        description: req.body.description,
        img: req.body.img
      });

      newCity = await newCity.save();
      const response = {
        message: 'City successfuly added!',
        createdCity: newCity
      }
      res.status(201).json(response);
    }
    catch (err) {
      console.log(err)
      // res.status(500).send("Server error");
      res.status(500).json({ error: err });
    }
  });

// DELETE a city
router.delete('/',
  async (req, res, next) => {
    try {
      const id = req.body.id;
      const deleteCity = await cityModel.findByIdAndDelete(id)

      if (!deleteCity) {
        const error = new Error('Failed to delete - invalid id');
        error.status = 400;
        next(error);
      }

      const response = {
        message: 'City deleted',
        deletedCity: deleteCity.name
      }
      res.json(response)
    }
    catch (err) {
      console.log(err)
      // res.status(500).send("Server error");
      res.status(500).json({ error: err });
    }
  });

// UPDATE a city
router.patch('/',
  async (req, res, next) => {
    try {
      const id = req.body.id;
      const updateCity = await cityModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });

      if (!updateCity) {
        const error = new Error('Failed to update - invalid id');
        error.status = 400;
        next(error);
      }
      const response = {
        message: 'City updated',
        updatedCity: updateCity
      }
      res.json(response)
    }
    catch (err) {
      console.log(err)
      // res.status(500).send("Server error");
      res.status(500).json({ error: err });
    }
  });

module.exports = router;
