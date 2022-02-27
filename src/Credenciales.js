// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtHgcKsq_0X_4qbYnsytG6mFn6eKjgOhY",
  authDomain: "cuba-84aae.firebaseapp.com",
  projectId: "cuba-84aae",
  storageBucket: "cuba-84aae.appspot.com",
  messagingSenderId: "353461092879",
  appId: "1:353461092879:web:65952c3c412353f98a197a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

export { firebaseApp, storage, firestore };