import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

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

// Function to set the token in the API instance
export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};