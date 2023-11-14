// routes/mobileLoginRoutes.js
const express = require('express');
const authController = require('../controllers/mobileLoginController');

const router = express.Router();

router.post('/request-otp', authController.requestOTP);

module.exports = router;
