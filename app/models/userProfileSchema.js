const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    // You may want to add more email validation here
    // You can use a library like validator.js for this purpose
  },
  mobileNumber: {
    type: String,
    required: true,
    // You may want to add more mobile number validation here
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  referralCode: {
    type: String,
    trim: true,
    // You may want to add validation for the referral code format here
  },
  userStatus: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
      required: true,
  },
}, {
  timestamps: true,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
