// models/Trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  vehicleType: String,
  goodType: String,
  pickupAddress: String,
  senderName: String,
  senderMobileNumber: String,
  pickupHouseApartment: String,
  pickupContact: String,
  dropLocation: String,
  receiverName: String,
  receiverMobileNumber: String,
  dropHouseApartment: String,
  stopLocation: [String],
  extraHelper: Boolean,
  paymentMethod: String,
  paymentStatus: String,
  discountCouponApplied: String,
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
