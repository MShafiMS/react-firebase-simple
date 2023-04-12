// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi5ceRpVU8s6y0VYPPvxDRsXNqycl4OSE",
  authDomain: "react-app-with-firebase-auth.firebaseapp.com",
  projectId: "react-app-with-firebase-auth",
  storageBucket: "react-app-with-firebase-auth.appspot.com",
  messagingSenderId: "467677768464",
  appId: "1:467677768464:web:30b8e1bcdf90a4b8721395",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
