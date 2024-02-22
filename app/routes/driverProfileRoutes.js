// driverRoutes.js
const express = require('express');
const router = express.Router();
const { registerDriver, updateDriver, fetchDriverDetails} = require('../controllers/driverProfileController');

router.post('/register', registerDriver);
router.put('/update/:driverId', updateDriver);
router.post('/driver-profile', fetchDriverDetails);

module.exports = router;
