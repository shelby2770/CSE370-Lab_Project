// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCieU4hVLtQSNE1jvyLUh2nj72HrlneTMA",
  authDomain: "slyther-tech.firebaseapp.com",
  projectId: "slyther-tech",
  storageBucket: "slyther-tech.appspot.com",
  messagingSenderId: "841287059165",
  appId: "1:841287059165:web:501865bf4ce87e56ed7d34",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;