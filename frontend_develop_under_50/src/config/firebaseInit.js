import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
console.log('Came inside firebase init ');
console.log(process.env.REACT_APP_FIREBASE_API_KEY);
const config = {

    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
console.log(process.env.REACT_APP_FIREBASE_API_KEY);
firebase.initializeApp(config);
//firebase.firestore().settings({timestampsInSnapShots:true});

export default firebase;