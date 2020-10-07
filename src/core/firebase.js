import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOV18zogcc-RHRt70VkPn3FUAYXBxAk00",
  authDomain: "joblist-eb3f6.firebaseapp.com",
  databaseURL: "https://joblist-eb3f6.firebaseio.com",
  projectId: "joblist-eb3f6",
  storageBucket: "joblist-eb3f6.appspot.com",
  messagingSenderId: "804955760936",
  appId: "1:804955760936:web:1afeca66c11591fd9ec81d",
};

export const fire = firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();

export default database;
