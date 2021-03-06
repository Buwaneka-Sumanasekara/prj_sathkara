import { messaging,serverKey,database,topic } from '../constants/firebase';


export async function askForPermissioToReceiveNotifications(uid) {
  try {
    if(messaging !==null){

    
    messaging.requestPermission().then(function () {
      console.log('Notification permission granted.');
      
      messaging.getToken().then(function(currentToken) {
        if (currentToken) {
          console.log(`Msg Token:`);
          console.log(currentToken)
  
          updateUserToken(uid,currentToken);
          subscribeForCommonNotifications(currentToken);

        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
        }
      }).catch(function(err) {
        console.log('An error occurred while retrieving token. ', err);
      });
    }).catch(function (err) {
      console.log('Unable to get permission to notify.', err);
    });
  }
  } catch (error) {
    
  }
 
}


export async function TokenChange(uid) {
  if(messaging!==null){
    messaging.onTokenRefresh(function() {
      messaging.getToken().then(function(refreshedToken) {
        console.log('Token refreshed.');
        updateUserToken(uid,refreshedToken)
      }).catch(function(err) {
        console.log('Unable to retrieve refreshed token ', err);
        
      });
    });
  }
 
}

export async function updateUserToken(uid,token){


  if(uid !== undefined){
 
    let donref = database.ref(`user-notif-tokens/${uid}`);
    let upobj = {};
    upobj['uid'] = uid;
    upobj['token'] = token;
  
    donref.update(upobj);
  }
 
}

async function subscribeForCommonNotifications(token) {
  if(messaging!==null){
    console.log(`Subcribe Global msg to:${token}`);
    console.log(`${serverKey}`);
     
    return fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
        timeout: 1200 * 1000,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`key=${serverKey}`
        }
    });
  }
 

}


export async function updateNotificationState(notif){
  if(notif !== undefined){
    console.log(notif);
    if(notif.istopic){
      let donref = database.ref(`notifications/topics/${notif.id}`);
      let upobj = {};
      upobj['isseen'] = true;
      donref.update(upobj);
    }else{
      let donref = database.ref(`notifications/users/${notif.uid}/${notif.id}`);
      let upobj = {};
      upobj['isseen'] = true;
      donref.update(upobj);
    }
   
  }
 
}


export async function OnMessageListner(){
  messaging.onMessage(function(payload) {
    console.log('Message received. ', payload);
   
  });
}