import * as admin from 'firebase-admin';
import * as commonfun from '../common';

export async function sendNotificationsDirect(req, res) {
    const obj = req.body;
    if (obj.istopic) {
        const message = {
            notification: {
                title: `Team සත්කාර : ${obj.title}`,
                body: obj.body,
            },
            webpush: {
                notification: {
                    title: `Team සත්කාර : ${obj.title}`,
                    body: obj.body,
                    badge: "https://firebasestorage.googleapis.com/v0/b/sathkara-bb902.appspot.com/o/defaults%2Frsz_3logo.png?alt=media&token=69400e45-135d-46cd-ad8f-7b5019216bcb",
                    icon: "https://firebasestorage.googleapis.com/v0/b/sathkara-bb902.appspot.com/o/defaults%2Frsz_3logo.png?alt=media&token=69400e45-135d-46cd-ad8f-7b5019216bcb"
               

                }, fcm_options: {
                    link: obj.url
                }
            },
            topic: 'sathkara-common-notif'
        };
        admin.messaging().send(message)
            .then((response) => {

                res.status(200).send({ 'msg': "Send message to group" });
            })
            .catch((error) => {

                res.status(400).send({ 'msg': `Send Faild ${error}` });
            });
    } else {
        const registrationToken = obj.token;
        const message = {
            notification: {
                title: `${obj.title}`,
                body: obj.body,
            },
            webpush: {
                notification: {
                    title: obj.title,
                    body: obj.body,
                    badge: "https://firebasestorage.googleapis.com/v0/b/sathkara-bb902.appspot.com/o/defaults%2Frsz_3logo.png?alt=media&token=69400e45-135d-46cd-ad8f-7b5019216bcb",
                    icon: "https://firebasestorage.googleapis.com/v0/b/sathkara-bb902.appspot.com/o/defaults%2Frsz_3logo.png?alt=media&token=69400e45-135d-46cd-ad8f-7b5019216bcb"
               
                }, fcm_options: {
                    link: obj.url
                }
            },
            token: registrationToken
        };

        admin.messaging().send(message)
            .then((response) => {
                // Response is a message ID string.
                res.status(200).send({ 'msg': "Send message to User" });

            })
            .catch((error) => {
                res.status(400).send({ 'msg': `Send Faild ${error}` });
            });
    }
}

export async function sendNotificationsAuto(req, res) {
    const obj = req.body;

    commonfun.saveNotifications(obj.istopic, obj.uid, obj.token, obj.title, obj.body, obj.url)  
    .then((response) => {
        // Response is a message ID string.
       // console.log('Successfully sent message To Group:', response);
        res.status(200).send({ 'msg': `Send Send: ${response}` });
    })
    .catch((error) => {
        res.status(500).send({ 'msg': `Send Send Faild: ${error}` });
    });
   
}