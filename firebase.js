// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB28_LGqOoeMOcKFq4lQjsC3cIW3bpFeOI",
  authDomain: "generic-template-8d3da.firebaseapp.com",
  projectId: "generic-template-8d3da",
  storageBucket: "generic-template-8d3da.appspot.com",
  messagingSenderId: "289493915013",
  appId: "1:289493915013:web:6a52442986576b04e2e0ec",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export { app };
