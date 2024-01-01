const express = require('express');
const router = express.Router();
const Billing = require('../models/billingSchema'); // Import your Mongoose Billing model

// POST /api/billing - Endpoint for handling billing details
router.post('/', async (req, res) => {
  try {
    // Extract data from request body
    const { discountCode, paymentMethod, buyGoldMembership } = req.body;

    // Perform calculations or any logic you need for billing details
    const amountPayable = 936; // Placeholder value, replace with your logic
    const discountApplied = 0; // Placeholder value, replace with your logic
    const taxes = 0; // Placeholder value, replace with your logic
    const totalAmountPaid = amountPayable; // Placeholder value, replace with your logic

    // Create a new Billing document
    const newBilling = new Billing({
      discountCode,
      paymentMethod,
      buyGoldMembership,
      amountPayable,
      discountApplied,
      taxes,
      totalAmountPaid
    });

    // Save the billing details to the database
    await newBilling.save();

    // Send success response with billing details
    res.status(200).json({
      success: true,
      billingDetails: {
        amountPayable,
        discountApplied,
        taxes,
        totalAmountPaid
      }
    });
  } catch (error) {
    // Handle errors
    console.error('Error in billing:', error);
    res.status(500).json({ success: false, error: 'Failed to process billing' });
  }
});

module.exports = router;
