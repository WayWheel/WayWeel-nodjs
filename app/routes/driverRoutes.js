const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

// POST route for driver registration
router.post('/register', driverController.registerDriver);

// PUT route for editing driver entries
router.put('/register/:id', driverController.updateDriver);

module.exports = router;
