import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfJyZ778fIqyu6MpWqSWOT2qHditSoZVI",
  authDomain: "fir-notes-1725d.firebaseapp.com",
  projectId: "fir-notes-1725d",
  storageBucket: "fir-notes-1725d.appspot.com",
  messagingSenderId: "926182583140",
  appId: "1:926182583140:web:7242ab010b5984470ba871",
  measurementId: "G-87KLSFJD55",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
