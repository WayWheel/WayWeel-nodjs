const Profile = require('../models/userProfileSchema');

const createProfile = async (req, res) => {
    try {
      // Extract user data from the request body
      const { fullname, email, mobileNumber, city, referralCode } = req.body;
  
      // Check if a profile with the given mobile number already exists
      const existingProfile = await Profile.findOne({ mobileNumber });
  
      if (existingProfile) {
        // If a profile with the mobile number already exists, respond with an error
        return res.status(400).json({ error: 'Mobile number must be unique' });
      }
  
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
