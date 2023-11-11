const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // You can add a simple email validation regex
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
