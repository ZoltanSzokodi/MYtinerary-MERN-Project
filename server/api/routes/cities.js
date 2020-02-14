const express = require('express');
const passport = require('passport');

const router = express.Router();

const CitiesController = require('../controllers/citiesController');

// GET all cities =====================================
router.get('/all',
  CitiesController.getAllCities);

// POST a new city ====================================
router.post('/',
  passport.authenticate('jwt', { session: false }),
  CitiesController.postCity);

// DELETE a city ======================================
router.delete('/',
  passport.authenticate('jwt', { session: false }),
  CitiesController.deleteCity);

// UPDATE a city =====================================
router.patch('/',
  passport.authenticate('jwt', { session: false }),
  CitiesController.updateCity);

module.exports = router;
