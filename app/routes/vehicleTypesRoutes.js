// Define your Express router
const express = require('express');
const router = express.Router();

// Define the endpoint for GET /api/vehicle/types
router.get('/types', (req, res) => {
  // Mocked response data
  const vehicleTypes = [
    { type: "truck" },
    { type: "3 wheeler" },
    { type: "2 wheeler" }
  ];

  // Respond with the data
  res.status(200).json({ success: true, vehicleTypes });
});

// Export the router to use in your main app
module.exports = router;
