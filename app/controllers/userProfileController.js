const Profile = require('../models/userProfileSchema');

const createProfile = async (req, res) => {
  try {
    // Extract user data from the request body
    const { fullname, email, mobileNumber, city, referralCode } = req.body;

    // Create a new profile instance
    const newProfile = new Profile({
      fullname,
      email,
      mobileNumber,
      city,
      referralCode,
    });

    // Save the profile to the database
    const savedProfile = await newProfile.save();

    // Respond with the saved profile
    res.json(savedProfile);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createProfile,
};
