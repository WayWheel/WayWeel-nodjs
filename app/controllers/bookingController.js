const Booking = require('../models/bookingSchema');

// Controller functions
const createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other controller functions (update, delete, etc.) could be added here

module.exports = {
  createBooking,
  getBookings,
  // Other exported functions
};
