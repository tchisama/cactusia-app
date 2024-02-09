// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOgFLz9MOVlfMoT_CuU6ncrxzvtinYziY",
  authDomain: "cactusia-983c2.firebaseapp.com",
  projectId: "cactusia-983c2",
  storageBucket: "cactusia-983c2.appspot.com",
  messagingSenderId: "153270618122",
  appId: "1:153270618122:web:76aef6857423b35146b7f3",
  measurementId: "G-WK67S9GBC2"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();

export const db = getFirestore(app)