import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { storage } from 'firebase/storage';

/* Firebase configuration, values taken from .env file */
var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId:process.env.REACT_APP_MEASUREMENT_ID,
  };

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase; 

/* Firebase authentication instance */
export const authService = firebase.auth();

/* Firestore, firebase database */
export const db = firebase.firestore();

/* Database for handling of image uploads */
export const imageStorage = firebase.storage();
