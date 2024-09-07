// scripts/migrateData.js
const admin = require('firebase-admin'); // Import firebase-admin
const mongoose = require('mongoose'); // Import mongoose
const User = require('../models/User'); // Import User model
const EnergyData = require('../models/EnergyData');

admin.initializeApp();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }); // Connect to MongoDB

async function migrateUsers() {
  const snapshot = await admin.firestore().collection('users').get();
  for (let doc of snapshot.docs) {
    const userData = doc.data(); // Get user data from Firestore
    await User.findOneAndUpdate(
      { firebaseUid: doc.id },
      userData,
      { upsert: true, new: true }
    );
  }
}

async function migrateEnergyData() {
  const snapshot = await admin.firestore().collection('energyData').get(); // Get energy data from Firestore
  for (let doc of snapshot.docs) {
    const energyData = doc.data(); // Get energy data from Firestore
    await EnergyData.create(energyData);
  }
}

async function migrate() {
  await migrateUsers(); // Migrate users
  await migrateEnergyData(); // Migrate energy data
  console.log('Migration complete'); // Log migration complete
  process.exit(0); // Exit process
}

migrate().catch(console.error); // Run migration