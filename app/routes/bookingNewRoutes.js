const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingNewSchema'); // Adjust the path as needed

// Define the endpoint for POST /api/booking
router.post('/', async (req, res) => {
  try {
    const {
      vehicleType,
      includeHelper,
      pickupContact,
      dropContact,
      goodsType
    } = req.body;

    const newBooking = new Booking({
      vehicleType,
      includeHelper,
      pickupContact,
      dropContact,
      goodsType
    });

    // Save the new booking details to the database
    const savedBooking = await newBooking.save();

    // Respond with a success message and the saved booking details
    res.status(200).json({ success: true, bookingDetails: savedBooking });
  } catch (error) {
    // Handle errors if any occur during the process
    console.error('Error saving booking details:', error);
    res.status(500).json({ success: false, error: 'Failed to save booking details' });
  }
});

module.exports = router;
