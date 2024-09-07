const express = require('express'); // Import express
const router = express.Router(); // Create router
const EfficiencyReport = require('../models/EfficiencyReport'); // Import EfficiencyReport model
const { auth } = require('../middleware/auth');

// Generate a new efficiency report
router.post('/generate', auth, async (req, res) => {
  try {
    const reportData = { ...req.body, userId: req.user._id }; // Create report data
    const report = new EfficiencyReport(reportData); // Create new report
    await report.save(); // Save report to database
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Return 400 if error
  }
});

// Get all efficiency reports for a user
router.get('/', auth, async (req, res) => {
  try {
    const reports = await EfficiencyReport.find({ userId: req.user._id }).sort({ timestamp: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific efficiency report
router.get('/:id', auth, async (req, res) => {
  try {
    const report = await EfficiencyReport.findOne({ _id: req.params.id, userId: req.user._id });
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;