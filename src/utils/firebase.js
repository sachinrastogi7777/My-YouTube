// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAazQPWQFWVxn_a_K2RoEKq_RcKtBLg3r8",
  authDomain: "clone-9792b.firebaseapp.com",
  projectId: "clone-9792b",
  storageBucket: "clone-9792b.appspot.com",
  messagingSenderId: "936728098762",
  appId: "1:936728098762:web:99027ba443100708b4c133",
  measurementId: "G-7S6BEHQ80Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
