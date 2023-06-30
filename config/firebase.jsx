// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM3Ihr83goOJhzIijOQcgTPGA_muh_2O4",
  authDomain: "tp-final-672e9.firebaseapp.com",
  projectId: "tp-final-672e9",
  storageBucket: "tp-final-672e9.appspot.com",
  messagingSenderId: "133273049867",
  appId: "1:133273049867:web:59e683d67ac1716030200e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
