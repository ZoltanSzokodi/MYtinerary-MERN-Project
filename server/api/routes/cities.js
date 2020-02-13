const express = require('express');
const router = express.Router();
const City = require('../model/cityModel');
const appError = require('../../utils/appError');

// GET all cities ----------------------------------
router.get('/all',
  async (req, res) => {
    try {
      const cities = await City.find({})
        .select('name country description img'); // only the fields I need
      const response = {
        length: cities.length,
        cities: cities
      };
      res.send(response);
    }
    catch (error) {
      res.status(500).json(error);
    }
  });

// POST a new city ---------------------------------
router.post('/',
  async (req, res) => {
    try {
      const cityName = await City.findOne({ name: req.body.name });

      cityName && appError('This city already exists', 409);

      let city = await City.create(req.body);
      const response = {
        message: 'City successfuly added!',
        newCity: city
      };
      res.status(201).json(response);
    }
    catch (error) {
      res.status(error.status || 500).json(error);
    }
  });

// DELETE a city ------------------------------------
router.delete('/',
  async (req, res) => {
    try {
      const cityId = await City.findByIdAndDelete(req.body.id);

      !cityId && appError('Invalid id number', 400);

      res.status(200).json({ message: 'City successfuly removed' });
    }
    catch (error) {
      res.status(error.status || 500).json(error);
    }
  });

// UPDATE a city -----------------------------------
router.patch('/',
  async (req, res) => {
    try {
      const city = await City.findByIdAndUpdate(req.body.id, req.body, {
        new: true,
        omitUndefined: false,
        runValidators: true,
      });

      !city && appError('Invalid id number', 400);

      const response = {
        message: 'City successfuly updated!',
        updatedCity: city
      };
      res.json(response);
    }
    catch (error) {
      res.status(error.status || 500).json(error);
    }
  });

module.exports = router;
