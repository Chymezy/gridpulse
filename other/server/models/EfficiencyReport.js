const mongoose = require('mongoose'); // Import mongoose

const efficiencyReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  overallEfficiency: Number,
  energySavings: Number,
  costSavings: Number,
  carbonReduction: Number,
  recommendations: [String],
  analysisId: String
});

module.exports = mongoose.model('EfficiencyReport', efficiencyReportSchema);