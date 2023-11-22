const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Routes
router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.getBookings);
// Define other routes (e.g., update, delete) here

module.exports = router;
