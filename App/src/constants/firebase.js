import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const prodConfig = {
  apiKey: "AIzaSyCWfZqvMjAGIlDN6OrwqyK0kcyj1FyOaY8",
  authDomain: "sathkara-bb902.firebaseapp.com",
  databaseURL: "https://sathkara-bb902.firebaseio.com",
  projectId: "sathkara-bb902",
  storageBucket: "sathkara-bb902.appspot.com",
  messagingSenderId: "937169849327"
};

const devConfig = {
  apiKey: "AIzaSyAJlP9GuVakGrCy5BN37gLx0kuDeZV5yOQ",
  authDomain: "sathkara-test.firebaseapp.com",
  databaseURL: "https://sathkara-test.firebaseio.com",
  projectId: "sathkara-test",
  storageBucket: "sathkara-test.appspot.com",
  messagingSenderId: "1025410139450"

};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

console.log(`Mode:${process.env.NODE_ENV}`)  
console.log(`System init as #${JSON.stringify(config)}#`)

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();
const WebAPI = `https://${config.authDomain}/api/v1`;

export {
  firebase,
  auth,
  database,
  storage,
  WebAPI
};