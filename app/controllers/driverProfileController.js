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

// const getAllDriverDetails = async (req, res) => {
//     try {
//         const drivers = await Driver.find();

//         if (!drivers || drivers.length === 0) {
//             return res.status(404).json({ success: false, message: 'No drivers found' });
//         }

//         res.json({
//             success: true,
//             drivers,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };

const getAllDriverDetails = async (req, res) => {
    try {
        const drivers = await Driver.find();

        if (!drivers || drivers.length === 0) {
            return res.status(404).json({ success: false, message: 'No drivers found' });
        }

        const formattedDrivers = drivers.map(driver => ({
            driverId: driver._id,
            name: driver.profile.driverName,
            registrationDate: driver.createdAt, // Assuming you have a createdAt field in your schema
            contact: driver.profile.driverPhone,
            city: driver.profile.city,
            status: driver.profile.status,
        }));

        res.json({
            success: true,
            data: formattedDrivers,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
 

const getAllDriverInfoById = async (req, res) => {
    try {
        const { driverId } = req.params; // Use driverId instead of driverid
        // console.log(driverId);

        const driver = await Driver.findById({_id:driverId});

        if (!driver) {
            return res.status(404).json({ success: false, message: 'Driver not found' });
        }

        const {
            _id: id,
            profile: {
                driverName: name,
                driverPhone: phone,
                city,
                state,
                driverEmail: email,
                driverProfileImage: imgUrl,
            },
            createdAt: registrationDate,
            verificationStatus,
            vehicleType,
            vehicleModel: VehicleModel,
            vehicleNumber: vehicleNo,
            images: {
                aadharCardFront: idProof,
            },
        } = driver;

        res.json({
            success: true,
            data: [{
                driverId: id, // Fix here: use driverId instead of id
                name,
                phone,
                city,
                state,
                email,
                imgUrl,
                registrationDate,
                verificationStatus,
                vehicleType,
                VehicleModel,
                vehicleNo,
                idProof,
            }],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};



module.exports = { registerDriver, updateDriver, fetchDriverDetails, getAllDriverDetails, getAllDriverInfoById };
