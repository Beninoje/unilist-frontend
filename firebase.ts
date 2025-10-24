import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyBP2HXN93ea_DkruJ1mbZSn8IQgNw4ArlI",
  authDomain: "unilist-35bb3.firebaseapp.com",
  projectId: "unilist-35bb3",
  storageBucket: "unilist-listings-image-upload",
  messagingSenderId: "8970627027",
  appId: "1:8970627027:web:6cb8fdcd56a7df75da7126",
  measurementId: "G-HTERBM6QT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);