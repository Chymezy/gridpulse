const admin = require('firebase-admin'); // Import firebase-admin
const serviceAccount = require('./serviceAccountKey.json'); // Import service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

module.exports = admin; // Export firebase-admin