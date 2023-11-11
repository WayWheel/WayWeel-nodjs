// const User = require('../models/user');
const RegularUser  = require('../models/userAll');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); // Import dotenv package

// Load environment variables from the .env file
dotenv.config();

// Registration controller
exports.register = async (req, res) => {
  try {
    const { username, email, password, currentLocation, region } = req.body;

    // Check if the user already exists
    const existingUser = await RegularUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Get the current date and time
    const registrationDate = new Date();

    // Create a new user with the registrationDate field
    const user = new RegularUser({
      username,
      email,
      passwordHash,
      currentLocation,
      region,
      registrationDate,
    });


    await user.save();

    // Generate a JWT token for the newly registered user using the secret key from the .env file
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
    });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await RegularUser.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Verify the password
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate a JWT token for the authenticated user using the secret key from the .env file
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
    });
  }
};
