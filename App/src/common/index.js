import { messaging,serverKey,database } from '../constants/firebase';

export async function askForPermissioToReceiveNotifications(uid) {
  messaging.requestPermission().then(function () {
    console.log('Notification permission granted.');
    
    messaging.getToken().then(function(currentToken) {
      if (currentToken) {
        console.log(currentToken);
        updateUserToken(uid,currentToken);
        subscribeForCommonNotifications(currentToken);

        //sendTokenToServer(currentToken);
        //updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        //updateUIForPushPermissionRequired();
        //setTokenSentToServer(false);
      }
    }).catch(function(err) {
      console.log('An error occurred while retrieving token. ', err);
     // showToken('Error retrieving Instance ID token. ', err);
      //setTokenSentToServer(false);
    });


  }).catch(function (err) {
    console.log('Unable to get permission to notify.', err);
  });
}

async function updateUserToken(uid,token){
  if(uid !== undefined){
    let donref = database.ref(`user-notif-tokens/${uid}`);
    let upobj = {};
    upobj['uid'] = uid;
    upobj['token'] = token;
  
    donref.update(upobj);
  }
 
}

async function subscribeForCommonNotifications(token) {
    
  return fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/sathkara-common-notif`, {
      timeout: 1200 * 1000,
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization":`key=${serverKey}`
      },
      body:JSON.stringify({

      })
  });

}