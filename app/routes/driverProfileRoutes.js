// driverRoutes.js
const express = require('express');
const router = express.Router();
const { registerDriver, updateDriver, fetchDriverDetails, getAllDriverDetails, getAllDriverInfoById} = require('../controllers/driverProfileController');

router.post('/register', registerDriver);
router.put('/update/:driverId', updateDriver);
router.post('/driver-profile', fetchDriverDetails);
router.get('/', getAllDriverDetails);
router.get('/:driverId', getAllDriverInfoById);
module.exports = router;
