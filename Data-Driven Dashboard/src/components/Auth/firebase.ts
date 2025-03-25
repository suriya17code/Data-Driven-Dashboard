// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAotJUTzW_ohj3V1SCZwARosE8-Pc6aXdo",
  authDomain: "login-auth-702b1.firebaseapp.com",
  projectId: "login-auth-702b1",
  storageBucket: "login-auth-702b1.firebasestorage.app",
  messagingSenderId: "657784684208",
  appId: "1:657784684208:web:737a2fff9bfd6317e34575"
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);
export const auth=getAuth()
export const db = getFirestore(App)
export default App