const express = require('express');
const router = express.Router();
const passport = require('passport');

const ItinerariesController = require('../controllers/itinerariesController');


// GET itineraries for a city ====================================
router.get('/:name',
  ItinerariesController.getItineraries);

// POST a new itinerary ==========================================
router.post('/:city',
  passport.authenticate('jwt', { session: false }),
  ItinerariesController.postItinerary);

// DELETE an itinerary ==========================================
router.delete('/',
  passport.authenticate('jwt', { session: false }),
  ItinerariesController.deleteItinerary);

// UPDATE an itinerary ==========================================
router.patch('/:itineraryId',
  passport.authenticate('jwt', { session: false }),
  ItinerariesController.updateItinerary);

module.exports = router;
