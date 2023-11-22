const mongoose = require('mongoose');

// Define a Mongoose schema for the booking
const BookingSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    sender: {
        name: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        }
    },
    receiver: {
        name: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        }
    },
    wheelerID: {
        type: mongoose.Schema.Types.ObjectId, // Assuming an ID referencing the wheeler
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['confirmed', 'pending', 'cancelled'],
        default: 'pending'
    }
});

// Create a Mongoose model for the Booking schema
const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
