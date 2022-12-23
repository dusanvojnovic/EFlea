import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHExFmyW2fBpn5ioMJgYiXWtGVMF52lfM",
  authDomain: "images-upload-57d36.firebaseapp.com",
  databaseURL: "gs://images-upload-57d36.appspot.com",
  projectId: "images-upload-57d36",
  storageBucket: "images-upload-57d36.appspot.com",
  messagingSenderId: "198646229065",
  appId: "1:198646229065:web:b60dbd5b3a483851d37798",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
