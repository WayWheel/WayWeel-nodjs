// Driver.js
const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    mobileNumber: { type: String, required: true },
    vehicleType: { type: String, required: true },
    vehicleModel: String,
    vehicleNumber: String,
    images: {
        aadharCardFront: String,
        aadharCardBack: String,
        drivingLicenseFront: String,
        drivingLicenseBack: String,
        vehicleImageFront: String,
        vehicleImageBack: String,
        panCard: String,
        registrationCertificate: String,
        pollutionCertificate: String,
        permit: String,
        insurance: String,
    },
    profile: {
        driverName: { type: String, required: true },
        driverProfileImage: String,
        driverEmail: String,
        driverPhone: String,
        city: String,
        referralCode: String,
        status: { 
            type: String, 
            enum: ['pending', 'approved', 'unapproved'], 
            default: 'pending', 
        },
    },
    accountDetails: {
        bankName: { type: String, required: true },
        accountHolderName: String,
        accountNumber: String,
        ifscCode: String,
        upi: String,
    },
    preferredAppLanguage: { type: String, required: true },
}, {
    timestamps: true, // This option adds createdAt and updatedAt fields
});

const Driver = mongoose.model('DriverProfile', driverSchema);

module.exports = Driver;
