const mongoose = require('mongoose');

const deliveryDetailsSchema = new mongoose.Schema({
  receiverName: String,
  receiverMobile: String,
  apartmentNumber: String
});

const DeliveryDetails = mongoose.model('DeliveryDetails', deliveryDetailsSchema);

module.exports = DeliveryDetails;
