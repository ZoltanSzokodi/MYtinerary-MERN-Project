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
    catch (error) {
      console.log(error);
      const response = {
        message: 'Failed to fetch cities',
        error
      }
      res.status(500).json(response);
    }
  });

// POST a new city ---------------------------------
router.post('/',
  async (req, res, next) => {
    try {
      await cityModel
        .findOne({ name: req.body.name });

      let newCity = await cityModel.create(req.body);

      const response = {
        message: 'City successfuly added!',
        createdCity: newCity
      }
      res.status(201).json(response);
    }
    catch (error) {
      console.log(error)
      const response = {
        message: 'Failed to post new city',
        error
      }
      res.status(500).json(response);
    }
  });

// DELETE a city ------------------------------------
router.delete('/',
  async (req, res, next) => {
    try {
      const id = req.body.id;
      await cityModel.findByIdAndDelete(id);

      const response = {
        message: `City with id: "${id}" is no longer in the DB`,
      }
      res.status(200).json(response)
    }
    catch (error) {
      console.log(error)
      const response = {
        message: 'Failed to delete city',
        error
      }
      res.status(500).json(response);
    }
  });

// UPDATE a city -----------------------------------
router.patch('/',
  async (req, res, next) => {
    try {
      const id = req.body.id;
      const updateCity = await cityModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });

      const response = {
        message: 'City updated',
        updatedCity: updateCity
      }
      res.json(response)
    }
    catch (error) {
      console.log(error)
      const response = {
        message: 'Failed to update city',
        error
      }
      res.status(500).json(response);
    }
  });

module.exports = router;
