const mongoose = require('mongoose');

// Define sub-schema for images
const imagesSchema = new mongoose.Schema({
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
  insurance: String
});

// Define sub-schema for driver profile
const profileSchema = new mongoose.Schema({
  driverName: String,
  driverProfileImage: String,
  driverEmail: String,
  driverPhone: String,
  city: String,
  referralCode: String
});

// Define sub-schema for account details
const accountDetailsSchema = new mongoose.Schema({
  bankName: String,
  accountHolderName: String,
  accountNumber: String,
  ifscCode: String,
  upi: String
});

// Define the main schema for driver registration
const driverRegistrationSchema = new mongoose.Schema({
  vehicleType: String,
  vehicleModel: String,
  vehicleNumber: String,
  images: imagesSchema,
  profile: profileSchema,
  accountDetails: accountDetailsSchema,
  preferredAppLanguage: String
});

// Create a model using the schema
const DriverRegistration = mongoose.model('DriverRegistration', driverRegistrationSchema);

module.exports = DriverRegistration;
