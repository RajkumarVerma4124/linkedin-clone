import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "YOUR_STUFF_HERE",
    authDomain: "YOUR_STUFF_HERE",
    projectId: "YOUR_STUFF_HERE",
    storageBucket: "YOUR_STUFF_HERE",
    messagingSenderId: "YOUR_STUFF_HERE",
    appId: "YOUR_STUFF_HERE",
    measurementId: "YOUR_STUFF_HERE"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }