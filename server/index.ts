// import express from 'express';
// import cors from 'cors';
// import { initializeApp, cert } from 'firebase-admin/app';
// import { getAuth } from 'firebase-admin/auth';
// import * as serviceAccount from '../gridpulse-privateKey.json';

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Initialize Firebase Admin SDK
// initializeApp({
//   credential: cert(serviceAccount as any),
// });

// // Middleware to verify Firebase ID token
// const verifyToken = async (req: any, res: any, next: any) => {
//   const idToken = req.headers.authorization?.split('Bearer ')[1];
//   if (!idToken) {
//     return res.status(403).json({ error: 'No token provided' });
//   }

//   try {
//     const decodedToken = await getAuth().verifyIdToken(idToken);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     res.status(403).json({ error: 'Invalid token' });
//   }
// };

// // Protected route example
// app.get('/api/protected', verifyToken, (req, res) => {
//   res.json({ message: 'Access granted to protected resource' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// import express from 'express';
// import cors from 'cors';
// import { initializeApp, cert } from 'firebase-admin/app';
// import { getAuth } from 'firebase-admin/auth';
// import { getFirestore, collection, setDoc, doc } from 'firebase-admin/firestore';
// import * as serviceAccount from '../gridpulse-privateKey.json';

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Initialize Firebase Admin SDK
// initializeApp({
//   credential: cert(serviceAccount as any),
// });

// const auth = getAuth();
// const db = getFirestore();

// // Middleware to verify Firebase ID token
// const verifyToken = async (req: any, res: any, next: any) => {
//   const idToken = req.headers.authorization?.split('Bearer ')[1];
//   if (!idToken) {
//     return res.status(403).json({ error: 'No token provided' });
//   }

//   try {
//     const decodedToken = await auth.verifyIdToken(idToken);
//     req.user = decodedToken;

//     // Get user role from Firestore
//     const userDoc = await db.collection('users').doc(decodedToken.uid).get();
//     if (!userDoc.exists) {
//       return res.status(403).json({ error: 'User does not exist' });
//     }

//     req.user.role = userDoc.data()?.role;
//     next();
//   } catch (error) {
//     res.status(403).json({ error: 'Invalid token' });
//   }
// };

// // Signup route
// app.post('/api/signup', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userCredential = await auth.createUser({
//       email,
//       password,
//     });

//     await auth.sendEmailVerification(userCredential.user);

//     // Add user to Firestore with a default role
//     await setDoc(doc(db, 'users', userCredential.uid), {
//       email,
//       role: 'viewer', // Default role
//       createdAt: new Date(),
//       lastLogin: null, // Can be updated upon login
//     });

//     const token = await userCredential.user.getIdToken();
//     res.json({ data: { token } });
//   } catch (error) {
//     res.status(500).json({ error: 'Signup failed' });
//   }
// });

// // Protected route example
// app.get('/api/protected', verifyToken, (req, res) => {
//   res.json({ message: 'Access granted to protected resource' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// server/index.ts

import express from 'express';
import cors from 'cors';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import * as serviceAccount from '../gridpulse-privateKey.json';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount as any),
});

const auth = getAuth();
const db = getFirestore();

// Middleware to verify Firebase ID token
const verifyToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken;

    // Get user role from Firestore
    const userDocRef = db.collection('users').doc(decodedToken.uid);
    const userDoc = await userDocRef.get();
    if (!userDoc.exists) {
      return res.status(403).json({ error: 'User does not exist' });
    }

    req.user.role = userDoc.data()?.role;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Signup route
app.post('/api/signup', async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  try {
    const userRecord = await auth.createUser({
      email,
      password,
    });

    // Generate a custom token to be used on the client side
    const customToken = await auth.createCustomToken(userRecord.uid);

    // Add user to Firestore with a default role
    const userDocRef = db.collection('users').doc(userRecord.uid);
    await userDocRef.set({
      email,
      role: 'viewer', // Default role
      createdAt: new Date(),
      lastLogin: null,
    });

    res.json({ data: { token: customToken } });
  } catch (error) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Admin route to assign roles
app.post('/api/assignRole', verifyToken, async (req: express.Request, res: express.Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' });
  }

  const { userId, newRole } = req.body;

  // Validate the newRole
  const validRoles = ['viewer', 'operator', 'admin'];
  if (!validRoles.includes(newRole)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    const userDocRef = db.collection('users').doc(userId);
    await userDocRef.set({ role: newRole }, { merge: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign role' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
