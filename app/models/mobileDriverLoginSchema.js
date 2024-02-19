// models/User.js
const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
