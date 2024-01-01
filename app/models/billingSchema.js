const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  discountCode: String,
  paymentMethod: String,
  buyGoldMembership: Boolean,
  amountPayable: Number,
  discountApplied: Number,
  taxes: Number,
  totalAmountPaid: Number
});

const Billing = mongoose.model('Billing', billingSchema);

module.exports = Billing;
