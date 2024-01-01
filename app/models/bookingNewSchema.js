const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String
});

const bookingNewSchema = new mongoose.Schema({
  vehicleType: String,
  includeHelper: Boolean,
  pickupContact: contactSchema,
  dropContact: contactSchema,
  goodsType: String
});

const BookingNew = mongoose.model('BookingNew', bookingNewSchema);

module.exports = BookingNew;
