const express = require('express');
const router = express.Router();
const profileController = require('../controllers/userProfileController');

// Route to handle profile creation
router.post('/create', profileController.createProfile);

module.exports = router;
