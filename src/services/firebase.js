import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDMyzG9Y29a8R7WPc-dSfCwBAsM4heIodg",
  authDomain: "cultiv-app-f4d8f.firebaseapp.com",
  projectId: "cultiv-app-f4d8f",
  storageBucket: "cultiv-app-f4d8f.firebasestorage.app",
  messagingSenderId: "447167983676",
  appId: "1:447167983676:web:be1d5ba36fa560c8b6d339"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;