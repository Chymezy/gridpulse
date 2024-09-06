const admin = require('firebase-admin');
const serviceAccount = require('./gridpulse-privateKey.json'); // Update with the correct path

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

async function listUsers() {
  try {
    // Fetch a list of users
    const listUsersResult = await auth.listUsers(1000);

    // Log user information
    listUsersResult.users.forEach(userRecord => {
      console.log(`User: ${userRecord.uid}, Email: ${userRecord.email}`);
    });

  } catch (error) {
    console.error('Error listing users:', error);
  }
}

listUsers();
