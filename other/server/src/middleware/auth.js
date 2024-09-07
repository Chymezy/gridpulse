// src/middleware/auth.js

const admin = require('firebase-admin'); // Import Firebase Admin SDK 

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from header

  if (!token) {
    return res.status(401).json({ error: 'No authentication token, access denied' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token); // Verify token
    req.user = decodedToken; // Set user in request
    next(); // Continue to next middleware
  } catch (error) {
    console.error('Error verifying token:', error); // Log error
    res.status(403).json({ error: 'Invalid token, access denied' }); // Return 403 if token is invalid
  }
};

module.exports = { auth }; // Export auth middleware

/**
 * Now, let's list the dependencies you need to install:
Express.js (for the server)
MongoDB (for the database)
Mongoose (for MongoDB object modeling)
Firebase Admin SDK (for authentication)
Cors (for handling Cross-Origin Resource Sharing)
Dotenv (for environment variables)
Multer (for handling file uploads)
CSV-parser (for parsing CSV files)

npm install express mongodb mongoose firebase-admin cors dotenv multer csv-parser
 */