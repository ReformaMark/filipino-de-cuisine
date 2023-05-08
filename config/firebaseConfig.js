import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import Constants from 'expo-constants';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUTaqBIhLJ6VLzaD8qz3gAJ3cKmid98zE",
  authDomain: "filipinodecuisine.firebaseapp.com",
  projectId: "filipinodecuisine",
  storageBucket: "filipinodecuisine.appspot.com",
  messagingSenderId: "516283628717",
  appId: "1:516283628717:web:4608dcaa9395dbaf80da24"
};

const app = initializeApp(firebaseConfig);

export default app;