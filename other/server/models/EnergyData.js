const mongoose = require('mongoose');

const energyDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, required: true },
  feederName: { type: String, required: true },
  consumption: { type: Number, required: true },
  voltage: { type: Number, required: true },
  current: { type: Number, required: true },
  activePower: Number,
  reactivePower: Number,
  powerFactor: Number,
  thd: Number,
  carbonIntensity: Number
});

module.exports = mongoose.model('EnergyData', energyDataSchema);