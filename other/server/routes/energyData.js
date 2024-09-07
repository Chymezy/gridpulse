const express = require('express'); // Import express
const router = express.Router(); // Create router
const EnergyData = require('../models/EnergyData'); // Import EnergyData model
const { auth } = require('../middleware/auth'); // Import auth middleware
const multer = require('multer'); // Import multer
const csv = require('csv-parser'); // Import csv-parser
const fs = require('fs');

const upload = multer({ dest: 'uploads/' }); // Create multer upload middleware

// Upload energy data
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const results = [];
  fs.createReadStream(req.file.path) // Create read stream
    .pipe(csv()) // Pipe stream to csv parser
    .on('data', (data) => results.push(data)) // On data event, push data to results array
    .on('end', async () => {
      try {
        const energyData = results.map(row => ({
          ...row,
          userId: req.user._id,
          timestamp: new Date(row.timestamp)
        }));
        await EnergyData.insertMany(energyData);
        fs.unlinkSync(req.file.path); // Delete the uploaded file
        res.status(201).json({ message: 'Data uploaded successfully', count: energyData.length });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
});

// Get energy data for a user
router.get('/', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = { userId: req.user._id };
    if (startDate && endDate) {
      query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    const energyData = await EnergyData.find(query).sort({ timestamp: 1 });
    res.json(energyData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;