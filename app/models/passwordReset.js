const mongoose = require('mongoose');

const passWordSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpiry: Date,
});

module.exports = mongoose.model('Password', passWordSchema);
