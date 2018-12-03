importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

/* Now initialize firebase app in the servie worker.
*
*/

const prodConfig = {
    messagingSenderId: "937169849327"
};

const devConfig = {
    messagingSenderId: "1025410139450"

};

const config=prodConfig;
firebase.initializeApp(config);


const messaging = firebase.messaging();

try {
    messaging.setBackgroundMessageHandler(function (payload) {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
     const notificationTitle = payload.data.title;
     const notificationOptions = {
       body: payload.data.body,
       icon: payload.data.icon
     };
     return self.registration.showNotification(notificationTitle,
       notificationOptions);
    });
} catch (error) {
    console.log(`Notification setup error:${error}`)
}
