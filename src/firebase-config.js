// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuQYPDO59IPwDxZuqNdGVv0emJDtxXyDQ",
  authDomain: "chatapp-219c3.firebaseapp.com",
  projectId: "chatapp-219c3",
  storageBucket: "chatapp-219c3.appspot.com",
  messagingSenderId: "794037845892",
  appId: "1:794037845892:web:cf9153ef21c6f42d0a67d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);