/** @format */

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA3jaNeQY0v95sPEaS8nvPRFQMO-W4buSk',
  authDomain: 'bunnybeanecomm.firebaseapp.com',
  projectId: 'bunnybeanecomm',
  storageBucket: 'bunnybeanecomm.appspot.com',
  messagingSenderId: '911208297645',
  appId: '1:911208297645:web:842062c1318e2be7d6c224',
  measurementId: 'G-MES88TB502',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
