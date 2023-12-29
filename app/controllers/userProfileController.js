const Profile = require('../models/userProfileSchema');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

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
  


  const userLogin = async (req, res) => {  
    const { mobileNumber } = req.body;

    // Simulate user data retrieval based on the provided mobile number
    // Replace this with your actual user authentication logic
    // For example, querying a database to find the user by mobile number
    // await Profile.findOne({ mobileNumber }) // Assuming you have a User model
    //   .then(async (user) => {
    //     if (!user) {
    //       return res.status(404).json({ success: false, message: 'User not found' });
    //     }
  
        // Check if a profile with the user's mobile number already exists
        const user = await Profile.findOne({ mobileNumber });

        // console.log(user);
  
        // if (existingProfile) {
        //   // If a profile with the mobile number already exists, respond with an error
        //   return res.status(400).json({ error: 'Mobile number must be unique' });
        // }
  
        // If the user is found and no profile exists, create a profile
        // const newProfile = new Profile({
        //   fullname: user.name,
        //   email: user.email,
        //   mobileNumber: user.mobileNumber,
        //   city: user.city,
        //   referralCode: user.referralCode,
        // });
  
        // // Save the profile to the database
        // const savedProfile = await newProfile.save();
  
        // Generate a JWT token for the authenticated admin user using the secret key from the .env file
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        // Create a JWT token for the user
        // const token = jwt.sign({ userId: user.userId }, 'your_secret_key', { expiresIn: '1h' });
  
        // Respond with success, the token, and the user's profile
        res.json({
          success: true,
          token: token,
          user: {
            userId: user.userId,
            name: user.fullname,
            email: user.email,
            mobileNumber: user.mobileNumber,
            city: user.city,
            referralCode: user.referralCode         
          }
        });
      // })
      // .catch(error => {
      //   console.error('Error during login:', error);
      //   res.status(500).json({ success: false, message: 'Internal server error' });
      // });
  }
module.exports = {
  createProfile, userLogin
};
