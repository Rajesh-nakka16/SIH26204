const express = require('express');
const router = express.Router();
const {
  planTrip,
  saveTrip,
  getTrips,
  getTripById,
  getDestinations,
} = require('../controllers/tripController');

router.post('/plan', planTrip);
router.post('/save', saveTrip);
router.get('/', getTrips);
router.get('/:id', getTripById);

module.exports = router;
