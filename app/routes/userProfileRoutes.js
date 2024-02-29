const express = require('express');
const router = express.Router();
const profileController = require('../controllers/userProfileController');

// Route to handle profile creation
router.post('/create', profileController.createProfile);
router.post('/login', profileController.userLogin);
router.put('/profile', profileController.userUpdate);
router.delete('/delete-user', profileController.deleteUser);
router.get('/', profileController.getAllUserDetails);

module.exports = router;
