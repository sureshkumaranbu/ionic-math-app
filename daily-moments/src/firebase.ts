import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAddLG5VusqbpMwlZ3E8RA6sRIZPuoq9dU",
  authDomain: "daily-moments-87e8b.firebaseapp.com",
  projectId: "daily-moments-87e8b",
  storageBucket: "daily-moments-87e8b.appspot.com",
  messagingSenderId: "836214775632",
  appId: "1:836214775632:web:c578900c1c3917f8c01655",
  measurementId: "G-F21DVTP1TN"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const firestore = app.firestore();
