import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCIpxAFfZD-YUNopPz53qzKf009iC0EHkI",
    authDomain: "linkedin-clone-rv.firebaseapp.com",
    projectId: "linkedin-clone-rv",
    storageBucket: "linkedin-clone-rv.appspot.com",
    messagingSenderId: "543087344492",
    appId: "1:543087344492:web:95636657478d829ffa1149",
    measurementId: "G-GVQERYZ7E0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage();


export { db, auth, storage }