const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  // Add other necessary fields related to vehicle details

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model assuming user information is stored there
    required: true,
  },
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;
