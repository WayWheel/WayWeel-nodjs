// driverController.js
const Driver = require('../models/driver-profile.model.js'); // Import your Mongoose schema

const registerDriver = async (req, res) => {
    try {
        const driver = new Driver(req.body);
        await driver.save();

        res.status(201).json({
            success: true,
            message: 'Driver registered successfully',
            data: {
                rating: 0.0,
                driverId: driver._id,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const updateDriver = async (req, res) => {
    const { driverId } = req.params;

    try {
        const updatedDriver = await Driver.findByIdAndUpdate(
            driverId,
            { $set: req.body },
            { new: true }
        );

        if (!updatedDriver) {
            return res.status(404).json({ success: false, message: 'Driver not found' });
        }

        res.json({
            success: true,
            message: 'Driver updated successfully',
            data: updatedDriver,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const fetchDriverDetails = async (req, res) => {
    const { mobileNumber } = req.body;

    try {
        const driver = await Driver.findOne({ mobileNumber });

        if (!driver) {
            return res.status(404).json({ success: false, message: 'Driver not found' });
        }

        res.json({
            success: true,
            driver,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getAllDriverDetails = async (req, res) => {
    try {
        const drivers = await Driver.find();

        if (!drivers || drivers.length === 0) {
            return res.status(404).json({ success: false, message: 'No drivers found' });
        }

        res.json({
            success: true,
            drivers,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = { registerDriver, updateDriver, fetchDriverDetails, getAllDriverDetails };
