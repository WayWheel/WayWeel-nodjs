const express = require('express');
const router = express.Router();
const DeliveryDetails = require('../models/DeliveryDetailsSchema'); // Adjust the path as needed

// Define the endpoint for POST /api/delivery/details
router.post('/details', async (req, res) => {
  try {
    // Create a new instance of DeliveryDetails using the request body
    const newDeliveryDetails = new DeliveryDetails({
      receiverName: req.body.receiverName,
      receiverMobile: req.body.receiverMobile,
      apartmentNumber: req.body.apartmentNumber
    });

    // Save the new delivery details to the database
    await newDeliveryDetails.save();

    // Respond with a success message
    res.status(200).json({ success: true });
  } catch (error) {
    // Handle errors if any occur during the process
    console.error('Error saving delivery details:', error);
    res.status(500).json({ success: false, error: 'Failed to save delivery details' });
  }
});

module.exports = router;
