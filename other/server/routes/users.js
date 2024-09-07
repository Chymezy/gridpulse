const express = require('express'); // Import express
const router = express.Router(); // Create router
const User = require('../models/User'); // Import User model
const { auth } = require('../middleware/auth'); // Import auth middleware

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { firebaseUid, email, displayName } = req.body; // Get user data from request body
    const user = new User({ firebaseUid, email, displayName }); // Create new user
    await user.save(); // Save user to database
    res.status(201).json(user); // Return 201 if user created
  } catch (error) {
    res.status(400).json({ message: error.message }); // Return 400 if error
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid }); // Find user by Firebase UID
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Return 404 if user not found
    }
    res.json(user); // Return user profile
  } catch (error) {
    res.status(500).json({ message: error.message }); // Return 500 if error
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body; // Get updates from request body  
    const user = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid }, // Find user by Firebase UID 
      updates,
      { new: true, runValidators: true } // Return updated user and validate updates                
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Return 404 if user not found
    }
    res.json(user); // Return updated user
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;