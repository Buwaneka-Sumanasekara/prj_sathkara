importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


const prodConfig = {
    messagingSenderId: "937169849327"
};



const config = prodConfig

firebase.initializeApp(config);

const messaging = firebase.messaging();