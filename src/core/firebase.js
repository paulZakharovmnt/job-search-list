import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtfXEAOyCoi8v63T4E0H_TdJfPyR6rZkw",
  authDomain: "job-base-70122.firebaseapp.com",
  databaseURL: "https://job-base-70122.firebaseio.com",
  projectId: "job-base-70122",
  storageBucket: "job-base-70122.appspot.com",
  messagingSenderId: "70839232285",
  appId: "1:70839232285:web:f5261f082e25a57e33a3f4",
};

export const fire = firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();

export default database;
