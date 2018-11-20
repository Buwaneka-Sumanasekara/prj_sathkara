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
  apiKey: "AIzaSyCWfZqvMjAGIlDN6OrwqyK0kcyj1FyOaY8",
    authDomain: "sathkara-bb902.firebaseapp.com",
    databaseURL: "https://sathkara-bb902.firebaseio.com",
    projectId: "sathkara-bb902",
    storageBucket: "sathkara-bb902.appspot.com",
    messagingSenderId: "937169849327"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

console.log(`System init as #${JSON.stringify(config)}#`)

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();


export {
  firebase,
  auth,
  database,
  storage
};