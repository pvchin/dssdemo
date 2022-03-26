import firebase from "firebase";
require("dotenv").config();

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "hrms-appsmithsutera.firebaseapp.com",
  projectId: "hrms-appsmithsutera",
  storageBucket: "hrms-appsmithsutera.appspot.com",
  messagingSenderId: "659537276793",
  appId: "1:659537276793:web:cf539909202a8b063049a8",
  measurementId: "G-91T6Y62H1S",
};

// Initialize Firebase
//let instance;

// export default function getFirebase() {
//   if (typeof window !== "undefined") {
//     if (instance) return instance;
//     instance = firebase.initializeApp(firebaseConfig);
//     return instance;
//   }

//   return null;
// }

const app = firebase.initializeApp(firebaseConfig);

export default app;
