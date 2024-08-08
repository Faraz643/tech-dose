// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH1_axiE7RCq4VEtVPpSwIG_kJDrSBPlI",
  authDomain: "tech-dose-images.firebaseapp.com",
  projectId: "tech-dose-images",
  storageBucket: "tech-dose-images.appspot.com",
  messagingSenderId: "282822887235",
  appId: "1:282822887235:web:bd214ef98e2c5c444311f6",
  measurementId: "G-1MVJ057ZL4",
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseDB);
const fireBaseStorage = getStorage(fireBaseApp);
export { fireBaseApp, fireBaseStorage };
