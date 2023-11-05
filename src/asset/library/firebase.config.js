// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMUmYLZJc2jAqPqRHM6r8HpFfshimi9y8",
  authDomain: "myproject-648db.firebaseapp.com",
  projectId: "myproject-648db",
  storageBucket: "myproject-648db.appspot.com",
  messagingSenderId: "331798656083",
  appId: "1:331798656083:web:27a002497b5425fc9b82a6",
  measurementId: "G-8KFDY0QTTP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);