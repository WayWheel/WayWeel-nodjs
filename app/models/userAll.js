const mongoose = require('mongoose');

// Define the regular user schema
const regularUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  currentLocation: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  // Add more fields as needed
  // For example, you can add an array of user roles: [{ type: String }]
});

// Create the regular user model
const RegularUser = mongoose.model('RegularUser', regularUserSchema);

module.exports = RegularUser
