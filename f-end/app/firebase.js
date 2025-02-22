// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
const fireBaseStorage = getStorage(fireBaseApp);
const fireBaseAuth = getAuth(fireBaseApp);
// const analytics = getAnalytics(firebaseDB);
export {
  fireBaseApp,
  fireBaseStorage,
  fireBaseAuth,
  GoogleAuthProvider,
  signInWithPopup,
};
