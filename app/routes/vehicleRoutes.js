const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Routes
router.post('/vehicles', vehicleController.addVehicle);
router.get('/vehicles', vehicleController.getVehicles);
router.delete('/vehicles/:id', vehicleController.deleteVehicle);
router.put('/vehicles/:id', vehicleController.editVehicle);

module.exports = router;
