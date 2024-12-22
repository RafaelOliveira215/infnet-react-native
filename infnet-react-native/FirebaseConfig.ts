// Import the necessary Firebase SDK functions
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase app configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbXSW4BtL3xl9G5rO3nh-B43DOgYBCdb4",
  authDomain: "react-native-ef5ea.firebaseapp.com",
  projectId: "react-native-ef5ea",
  storageBucket: "react-native-ef5ea.firebasestorage.app",
  messagingSenderId: "334887196519",
  appId: "1:334887196519:web:93cc3fe5b58869ece501c2",
  measurementId: "G-7HC7K55HG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export the auth instance for use in other files
export { auth };
