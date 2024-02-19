// routes/mobileLoginRoutes.js
const express = require('express');
const authController = require('../controllers/mobileDriverLoginController');

const router = express.Router();

router.post('/request-otp', authController.requestOTP);
// Endpoint: POST /verify-otp
router.post('/verify-otp', authController.verifyOTP);

module.exports = router;
