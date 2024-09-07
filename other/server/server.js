const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express(); // Initialize Express app

// Initialize Firebase Admin SDK
const serviceAccount = require('./voiceAdminKey.json'); // Load Firebase service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Initialize Firebase Admin SDK with service account
  databaseURL: process.env.FIREBASE_DATABASE_URL // Set Firebase database URL
});

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Connect to MongoDB
  .then(() => console.log('MongoDB connected...')) // Log success
  .catch(err => console.log(err)); // Log error

// Routes
const userRoutes = require('./routes/users'); // Import user routes
const energyDataRoutes = require('./routes/energyData'); // Import energy data routes
const efficiencyReportRoutes = require('./routes/efficiencyReports'); // Import efficiency report routes

app.use('/api/users', userRoutes); // Mount user routes
app.use('/api/energy-data', energyDataRoutes); // Mount energy data routes
app.use('/api/efficiency-reports', efficiencyReportRoutes); // Mount efficiency report routes

const PORT = process.env.PORT || 5000; // Set port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start server on specified port