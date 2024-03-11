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

        // Check if a profile with the user's mobile number already exists
        const user = await Profile.findOne({ mobileNumber });

        if (!user) {
          // If a profile with the mobile number already exists, respond with an error
          return res.status(400).json({success: false, error: 'user not exist' });
        }

        // Generate a JWT token for the authenticated admin user using the secret key from the .env file
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        // Create a JWT token for the user  
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
  
  }

  const userUpdate =  async (req, res) => {
    const { name, email, mobileNumber, city, referralCode } = req.body;
  
    try {
      // Find the user profile based on the provided mobile number
      const existingProfile = await Profile.findOne({ mobileNumber });
  
      if (!existingProfile) {
        return res.status(404).json({ success: false, error: 'User profile not found' });
      }
  
      // Update the profile with the provided data
      existingProfile.name = name;
      existingProfile.email = email;
      existingProfile.city = city;
      existingProfile.referralCode = referralCode;
  
      // Save the updated profile
      const updatedProfile = await existingProfile.save();
  
      // Respond with success and the updated profile
      res.json({ success: true, user: updatedProfile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }


  const deleteUser = async (req, res) => {
    const { mobileNumber } = req.body;

    try {
        // Find the user profile based on the provided mobile number
        const existingProfile = await Profile.findOne({ mobileNumber });

        if (!existingProfile) {
            return res.status(404).json({ success: false, error: 'User profile not found' });
        }

        // Delete the user profile
        await existingProfile.deleteOne(); // Use deleteOne() method for deletion

        // Respond with success message
        res.json({ success: true, message: 'Customer successfully deleted.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

// const getAllUserDetails = async (req, res) => {
//   try {
//       // Find all user profiles
//       const allProfiles = await Profile.find();

//       if (!allProfiles || allProfiles.length === 0) {
//           return res.status(404).json({ success: false, error: 'No user profiles found' });
//       }

//       // Respond with the array of user profiles
//       res.json({ success: true, profiles: allProfiles });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };

const getAllUserDetails = async (req, res) => {
  try {
      // Find all user profiles
      const allProfiles = await Profile.find();

      if (!allProfiles || allProfiles.length === 0) {
          return res.status(404).json({ success: false, error: 'No user profiles found' });
      }

      // Format the user profiles
      const formattedProfiles = allProfiles.map(profile => ({
          customerId: profile._id,
          name: profile.fullname,
          registrationDate: profile.createdAt, // Assuming you have a createdAt field in your schema
          contact: profile.mobileNumber,
          city: profile.city,
          userStatus: profile.userStatus,
      }));

      // Respond with the array of formatted user profiles
      res.json({ success: true, profiles: formattedProfiles });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getUserInfoById = async (req, res) => {
  const { customerId } = req.params; // Assuming the parameter is named userId

  try {
      // Find the user profile by ID
      const userProfile = await Profile.findById({_id:customerId});

      if (!userProfile) {
          return res.status(404).json({ success: false, error: 'User profile not found' });
      }

      // Format the user profile
      const formattedProfile = {
          customerId: userProfile._id,
          name: userProfile.fullname,
          registrationDate: userProfile.createdAt, // Assuming you have a createdAt field in your schema
          contact: userProfile.mobileNumber,
          city: userProfile.city,
          state: userProfile.state, // Add state field
          email: userProfile.email, // Add email field
          imgUrl: userProfile.imgUrl, // Add imgUrl field
          userStatus: userProfile.userStatus,
      };

      // Respond with the formatted user profile
      res.json({ success: true, data: [formattedProfile] });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};




module.exports = {
  createProfile, userLogin, userUpdate, deleteUser, getAllUserDetails,getUserInfoById
};
