import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

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

let messaging=null;
try {
 
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
    if (process.env.NODE_ENV === 'production') {
      messaging.usePublicVapidKey("BFXAY4O1TFz7NOzz7qdzMr6f8WSLVfa0MyKCKH-DNAOI_9JOt7vOixxFUCXkS6d_BuEwoWToRG13I2EZiBJ436w");
    } else {
      messaging.usePublicVapidKey("BL_8IFwrAbN4b0ycQ_haJ2fIRt2VSG8wiglsyOsdd4w0ZdnaOB4SenyKh7OOOn1bbAmmqDxoXsNERL_LgyQMRQA");
    }
    
  } else {
    
  }
 
} catch (error) {
  
}




const WebAPI = `https://${config.authDomain}/api/v1`;
let serverKey = "";
if (process.env.NODE_ENV === 'production') {
  serverKey = "AAAA2jOtC-8:APA91bFxeQlY3zvt0sOp5nS9ax2fuNsdq-oovxz1aQ0nyL6MALD1eFXb_CUj8c9ACX4tXMJ6_yJwm4yYrmHuWfc_USYI7b71uFyPb0xq5SrOXu339sW0_Z6VtZS0deZb-6r5yi83VEew"

} else {
  serverKey = "AAAA7r81BTo:APA91bFSEOmIm5_NE_HQpl24EILdnv4PizLkk339g9R4MBgwdcn2gOcTW4NviGtmfOHwonXMtCcamwfJFYSlshMntBQ2PHdOFepxXYfMU0dT5cS3BPiCf90VOpJRfgWB2YbCB23MVtT3"

}

let topic='sathkara-common-notif';

export {
  firebase,
  auth,
  database,
  storage,
  messaging,
  WebAPI,
  serverKey,
  topic
};