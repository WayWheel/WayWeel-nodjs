// routes/tripRoutes.js
const express = require('express');
const router = express.Router();
const Trip = require('../models/tripSchema');

// POST request to create a new trip
router.post('/bookings', async (req, res) => {
  try {
    const {
      vehicleType,
      goodType,
      pickupAddress,
      senderName,
      senderMobileNumber,
      pickupHouseApartment,
      pickupContact,
      dropLocation,
      receiverName,
      receiverMobileNumber,
      dropHouseApartment,
      stopLocation,
      extraHelper,
      paymentMethod,
      paymentStatus,
      discountCouponApplied,
    } = req.body;

    // Create a new Trip instance
    const newTrip = new Trip({
      vehicleType,
      goodType,
      pickupAddress,
      senderName,
      senderMobileNumber,
      pickupHouseApartment,
      pickupContact,
      dropLocation,
      receiverName,
      receiverMobileNumber,
      dropHouseApartment,
      stopLocation,
      extraHelper,
      paymentMethod,
      paymentStatus,
      discountCouponApplied,
    });

    // Save the trip to the database
    await newTrip.save();

    res.status(201).json({
      success: true,
      message: 'Trip booking successful!',
      tripDetails: newTrip,
    });
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ success: false, error: 'Failed to book trip' });
  }
});

module.exports = router;
