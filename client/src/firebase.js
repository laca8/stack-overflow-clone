// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxfZV2izyWzLeDQfSGQoseiohGp8ASeeM",
  authDomain: "stack-overflow-346d5.firebaseapp.com",
  projectId: "stack-overflow-346d5",
  storageBucket: "stack-overflow-346d5.appspot.com",
  messagingSenderId: "331798842963",
  appId: "1:331798842963:web:03854a11c737ec9a1e80a6",
  measurementId: "G-TFYBZ8FPDQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
