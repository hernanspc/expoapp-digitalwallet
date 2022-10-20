// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfn4rDcDCwqRkBUFdZCirXUHUSqbv-DlY",
  authDomain: "digitalwallet-b205e.firebaseapp.com",
  projectId: "digitalwallet-b205e",
  storageBucket: "digitalwallet-b205e.appspot.com",
  messagingSenderId: "975387723270",
  appId: "1:975387723270:web:f40dd14f39f64873f86587"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);