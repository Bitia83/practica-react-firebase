// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDlnNCH0dv90RtKqUhR7wTY-GdkkbeMdeI",
  authDomain: "react-1-8e82c.firebaseapp.com",
  projectId: "react-1-8e82c",
  storageBucket: "react-1-8e82c.appspot.com",
  messagingSenderId: "735355037418",
  appId: "1:735355037418:web:41edce405f64bb37e9d993"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };