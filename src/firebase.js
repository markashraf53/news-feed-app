import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyApKZkHvmSgqwqqyDV1Bu1i4lwrgIAwuZA",
  authDomain: "social-feed-c8d94.firebaseapp.com",
  projectId: "social-feed-c8d94",
  storageBucket: "social-feed-c8d94.appspot.com",
  messagingSenderId: "12085797038",
  appId: "1:12085797038:web:777a55c06678715cf7cd3f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app)