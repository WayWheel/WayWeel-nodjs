// const checkAuth = (req, res, next) => {
//     // Implement your authentication logic here
//     // You can check if the user is logged in, e.g., by checking a session, token, or other authentication mechanism
//     if (req.user) {
//       // User is authenticated
//       next(); // Proceed to the next middleware or route handler
//     } else {
//       res.status(401).json({ error: 'Unauthorized' });
//     }
//   };

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); // Import dotenv package

// Load environment variables from the .env file
dotenv.config();


const checkAuth = (req, res, next) => {
  // Extract the token from the request headers, assuming it's stored as an "Authorization" header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  // Verify the token using your secret key
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // The token is valid, and you can access the decoded user information if needed
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = checkAuth;

  
  module.exports = checkAuth;
  