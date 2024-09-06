// import axios from 'axios';
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

// const API_URL = 'http://localhost:5000/api';

// export const api = axios.create({
//   baseURL: API_URL,
// });

// const firebaseConfig = {
//   // Your Firebase configuration object
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);

// export const login = async (email: string, password: string) => {
//   const userCredential = await signInWithEmailAndPassword(auth, email, password);
//   const token = await userCredential.user.getIdToken();
//   return { data: { token } };
// };

// export const signup = async (email: string, password: string) => {
//   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//   await sendEmailVerification(userCredential.user);
//   const token = await userCredential.user.getIdToken();
//   return { data: { token } };
// };

// // Function to set the token in the API instance
// export const setAuthToken = (token: string) => {
//   api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// };

// import axios from 'axios';
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

// const API_URL = 'http://localhost:5000/api';

// export const api = axios.create({
//   baseURL: API_URL,
// });

// const firebaseConfig = {
//   // Your Firebase configuration object
//   apiKey: "AIzaSyDKdWDNXafAY_3vpO7da7ror2YdSI-MlQc",

//   authDomain: "gridpulse-33a53.firebaseapp.com",

//   projectId: "gridpulse-33a53",

//   storageBucket: "gridpulse-33a53.appspot.com",

//   messagingSenderId: "1040825585569",

//   appId: "1:1040825585569:web:89ef7cae8fc03686c105e0",

//   measurementId: "G-HSXZDTF4QP"

// };

// const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);

// export const login = async (email: string, password: string) => {
//   const userCredential = await signInWithEmailAndPassword(auth, email, password);
//   const token = await userCredential.user.getIdToken();
//   return { data: { token } };
// };

// export const signup = async (email: string, password: string) => {
//   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//   await sendEmailVerification(userCredential.user);
//   const token = await userCredential.user.getIdToken();
//   return { data: { token } };
// };

// // Function to set the token in the API instance
// export const setAuthToken = (token: string) => {
//   api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// };



// //chatgpt response
// import axios from 'axios';
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

// const API_URL = 'http://localhost:5000/api'; // Update with your server's actual endpoint

// // Firebase configuration object
// const firebaseConfig = {
//   apiKey: 'your-api-key',
//   authDomain: 'your-auth-domain',
//   projectId: 'your-project-id',
//   storageBucket: 'your-storage-bucket',
//   messagingSenderId: 'your-messaging-sender-id',
//   appId: 'your-app-id',
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);

// // Axios instance
// export const api = axios.create({
//   baseURL: API_URL,
// });

// // Function to log in user
// export const login = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const token = await userCredential.user.getIdToken(); // Get the ID token
//     return { data: { token } }; // Return token to client to use in server requests
//   } catch (error) {
//     throw new Error(error.message || 'Error logging in');
//   }
// };

// // Function to sign up user
// export const signUp = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     await sendEmailVerification(userCredential.user); // Send verification email
//     return userCredential;
//   } catch (error) {
//     throw new Error(error.message || 'Error signing up');
//   }
// };


// for .env
// REACT_APP_FIREBASE_API_KEY=your-api-key
// REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
// REACT_APP_FIREBASE_PROJECT_ID=your-project-id
// REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
// REACT_APP_FIREBASE_APP_ID=your-app-id



// api.ts

import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Transformer, Feeder, EnergyReading, Alert } from '../types/schema';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
});

const firebaseConfig = {
  // Your Firebase configuration object
  apiKey: "AIzaSyDKdWDNXafAY_3vpO7da7ror2YdSI-MlQc",

  authDomain: "gridpulse-33a53.firebaseapp.com",

  projectId: "gridpulse-33a53",

  storageBucket: "gridpulse-33a53.appspot.com",

  messagingSenderId: "1040825585569",

  appId: "1:1040825585569:web:89ef7cae8fc03686c105e0",

  measurementId: "G-HSXZDTF4QP"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Existing functions
export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  return { data: { token } };
};

export const signup = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCredential.user);
  const token = await userCredential.user.getIdToken();
  return { data: { token } };
};

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// New functions for Firestore interactions

// Transformers
export const addTransformer = async (transformer: Omit<Transformer, 'id'>) => {
  const docRef = await addDoc(collection(db, 'transformers'), transformer);
  return { id: docRef.id, ...transformer };
};

export const getTransformers = async () => {
  const querySnapshot = await getDocs(collection(db, 'transformers'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transformer));
};

export const updateTransformer = async (id: string, data: Partial<Transformer>) => {
  await updateDoc(doc(db, 'transformers', id), data);
};

export const deleteTransformer = async (id: string) => {
  await deleteDoc(doc(db, 'transformers', id));
};

// Feeders
export const addFeeder = async (feeder: Omit<Feeder, 'id'>) => {
  const docRef = await addDoc(collection(db, 'feeders'), feeder);
  return { id: docRef.id, ...feeder };
};

export const getFeeders = async () => {
  const querySnapshot = await getDocs(collection(db, 'feeders'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Feeder));
};

// EnergyReadings
export const addEnergyReading = async (reading: Omit<EnergyReading, 'id'>) => {
  const docRef = await addDoc(collection(db, 'energyReadings'), reading);
  return { id: docRef.id, ...reading };
};

export const getEnergyReadings = async (transformerId: string) => {
  const querySnapshot = await getDocs(collection(db, 'energyReadings'));
  return querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() } as EnergyReading))
    .filter(reading => reading.transformerId === transformerId);
};

// Alerts
export const addAlert = async (alert: Omit<Alert, 'id'>) => {
  const docRef = await addDoc(collection(db, 'alerts'), alert);
  return { id: docRef.id, ...alert };
};

export const getAlerts = async () => {
  const querySnapshot = await getDocs(collection(db, 'alerts'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Alert));
};

export const updateAlert = async (id: string, data: Partial<Alert>) => {
  await updateDoc(doc(db, 'alerts', id), data);
};