const express = require('express');
// const passport = require('./config/passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const passwordResetRoutes = require('./routes/passwordResetRoutes');
const contactRoutes = require('./routes/contactRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const mobileLoginRoutes = require('./routes/mobileLoginRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');


require('dotenv').config();


const app = express();

// Connect to MongoDB using Mongoose
// mongoose.connect('mongodb://localhost/login-app', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('MONGODB_ATLAS_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true });
const MONGODB_URI = process.env.MONGODB_ATLAS_CONNECTION_STRING;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });


// function isLoggedIn(req,res,next) {
//   req.user ? next() : res.sendStatus(401);
// }

// Express session setup
app.use(
  session({
    secret: 'metaBridge',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
  })
);

// Initialize Passport and session
// app.use(passport.initialize());
// app.use(passport.session());

// // EJS setup
// app.set('view engine', 'ejs');
// app.set('views', 'views');

// Routes
// app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/password', passwordResetRoutes);
app.use('/api/contacts', contactRoutes);

// Use booking routes
app.use('/api', bookingRoutes);
// Use vehicle routes
app.use('/api', vehicleRoutes);

//user
// Routes
app.use('/api/user-profile', userProfileRoutes); 
app.use('/api/auth', userProfileRoutes); 
app.use('/api/login', mobileLoginRoutes);

// Define the login route
// app.post('/api/auth/login', validateLoginBody, async (req, res) => {
//   const { mobileNumber } = req.body;

//   // Simulate user data retrieval based on the provided mobile number
//   // Replace this with your actual user authentication logic
//   // For example, querying a database to find the user by mobile number
//   User.findOne({ mobileNumber }) // Assuming you have a User model
//     .then(async (user) => {
//       if (!user) {
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }

//       // Check if a profile with the user's mobile number already exists
//       const existingProfile = await Profile.findOne({ mobileNumber });

//       if (existingProfile) {
//         // If a profile with the mobile number already exists, respond with an error
//         return res.status(400).json({ error: 'Mobile number must be unique' });
//       }

//       // If the user is found and no profile exists, create a profile
//       const newProfile = new Profile({
//         fullname: user.name,
//         email: user.email,
//         mobileNumber: user.mobileNumber,
//         city: user.city,
//         referralCode: user.referralCode,
//       });

//       // Save the profile to the database
//       const savedProfile = await newProfile.save();

//       // Create a JWT token for the user
//       const token = jwt.sign({ userId: user.userId }, 'your_secret_key', { expiresIn: '1h' });

//       // Respond with success, the token, and the user's profile
//       res.json({
//         success: true,
//         token: token,
//         user: {
//           userId: user.userId,
//           name: user.name,
//           email: user.email,
//           mobileNumber: user.mobileNumber,
//           city: user.city,
//           referralCode: user.referralCode,
//           profile: savedProfile // Include the created profile in the response
//         }
//       });
//     })
//     .catch(error => {
//       console.error('Error during login:', error);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     });
// });


app.use('/auth/logout',(req, res) => {
  req.session.destroy();
  res.send("See you again");
})

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
