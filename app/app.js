const express = require('express');
// const passport = require('./config/passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const passwordResetRoutes = require('./routes/passwordResetRoutes');
const contactRoutes = require('./routes/contactRoutes');
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
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/password', passwordResetRoutes);
app.use('/api/contacts', contactRoutes);

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
