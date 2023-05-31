// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD8fva8ZUOQFABHAalWbxEIhLFusk5gfc8",
  authDomain: "fir-f4720.firebaseapp.com",
  projectId: "fir-f4720",
  storageBucket: "fir-f4720.appspot.com",
  messagingSenderId: "431687956201",
  appId: "1:431687956201:web:616fc527ef22ac59d6e278"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider()
export default app;