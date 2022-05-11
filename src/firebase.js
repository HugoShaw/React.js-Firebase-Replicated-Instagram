// import firebase from "firebase"

// const firebaseapp = firebase.initializeApp({
//     apiKey: "AIzaSyCE2d0tknsb44yF8Zy99Pf7ZOkiGgI6188",
//     authDomain: "cse503-e7678.firebaseapp.com",
//     databaseURL:"https:cse503-e7678.firebaseio.com",
//     projectId: "cse503-e7678",
//     storageBucket: "cse503-e7678.appspot.com",
//     messagingSenderId: "171746433448",
//     appId: "1:171746433448:web:992f12e20296af4da6259d"
// });
// const db =firebaseapp.firestore();
// const auth =firebase.auth();
// const storage = firebase.storage();

// export {db,auth,storage};

import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import 'firebase/firestore';
import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCE2d0tknsb44yF8Zy99Pf7ZOkiGgI6188",
         authDomain: "cse503-e7678.firebaseapp.com",
         databaseURL:"https:cse503-e7678.firebaseio.com",
         projectId: "cse503-e7678",
         storageBucket: "cse503-e7678.appspot.com",
         messagingSenderId: "171746433448",
         appId: "1:171746433448:web:992f12e20296af4da6259d"
};

// Use this to initialize the firebase App
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

// Use these for db & auth
const db = firebase.firestore();
const auth = getAuth();

export { auth, db };