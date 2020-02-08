// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
// TODO: Replace the following with your app's Firebase project configuration
import makefire from 'makefire'
const firebaseConfig = {
    apiKey: "AIzaSyC7t--VXE6Ep2qSfuZ5VB2M-tSroqS3WVs",
    authDomain: "password-manager-fcf33.firebaseapp.com",
    databaseURL: "https://password-manager-fcf33.firebaseio.com",
    projectId: "password-manager-fcf33",
    storageBucket: "password-manager-fcf33.appspot.com",
    messagingSenderId: "536690829190",
    appId: "1:536690829190:web:0281380b5f66b871c3ee07"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const { useDocument, useCollection } = makefire(db)
export {
    useDocument,
    useCollection,
    firebase,
    db
}
