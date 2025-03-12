import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC0rY1e5DkgE-Lezeq3j3Q9NEHtl-DSFe8",
  authDomain: "filmfreakz-9bbfd.firebaseapp.com",
  projectId: "filmfreakz-9bbfd",
  storageBucket: "filmfreakz-9bbfd.appspot.com",
  messagingSenderId: "553650525441",
  appId: "1:553650525441:web:7a343f19a32a8d2c0eb700",
  measurementId: "G-64GWVDFFW8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);