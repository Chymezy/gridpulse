import express from 'express';
import cors from 'cors';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import * as serviceAccount from '../gridpulse-privateKey.json';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount as any),
});

// Middleware to verify Firebase ID token
const verifyToken = async (req: any, res: any, next: any) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Protected route example
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'Access granted to protected resource' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));