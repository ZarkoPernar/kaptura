import firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyAm3PGWRObkkXueUGAZlaRYefGi8y-p8wc",
    authDomain: "capturefly-ff14d.firebaseapp.com",
    databaseURL: "https://capturefly-ff14d.firebaseio.com",
    projectId: "capturefly-ff14d"
}


firebase.initializeApp(config)

export const db = firebase.firestore()

firebase.firestore().enablePersistence()
    .then(function () {
        // Initialize Cloud Firestore through firebase

    })
    .catch(function (err) {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
    })

export default firebase
