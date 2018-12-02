import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as _ from 'lodash';

export const calculateExpectRecivedAmounts = functions.database.ref('/donations')
    .onWrite(async evt => {

        const eventsref = admin.database().ref(`events`);
        const snapshot = await eventsref.orderByChild('active').equalTo(true).once("value");

        let liveEvent = null;
        for (const key in snapshot.val()) {
            liveEvent = snapshot.val()[key];
        }
        try {
            const donations = await admin.database().ref(`donations/${liveEvent.id}`).once("value");

            let expectAmount = 0;
            let recivedAmount = 0;
            const donationsArray = Object.keys(donations.val()).map(i => donations.val()[i])


            for (const userdonations of donationsArray) {
                const transactionsArray = Object.keys(userdonations).map(i => userdonations[i]);
                //console.log(transactionsArray); 
                for (const transaction of transactionsArray) {
                    if (transaction['donation-state'] === 1) {
                        recivedAmount += transaction.amount;
                    } else if (transaction['donation-state'] === 0) {
                        expectAmount += transaction.amount;
                    }
                }
            }


            console.log(`Expect:${expectAmount}, recived:${recivedAmount}`);
            const evntref = admin.database().ref(`events/${liveEvent.id}`);
            await evntref.update({
                "total-expect": expectAmount,
                "total-recived": recivedAmount,
                "total-contributors": donationsArray.length
            });
        } catch (error) {
            const evntref = admin.database().ref(`events/${liveEvent.id}`);
            await evntref.update({
                "total-expect": 0,
                "total-recived": 0,
                "total-contributors": 0
            });
        }

    });


export const updateMembers = functions.database.ref('/user')
    .onWrite(async evt => {
        try {

            const users = await admin.database().ref(`user`).once("value");
            const usersArray = Object.keys(users.val()).map(i => users.val()[i]);
            console.log(`Member updated! Members:${usersArray.length}`);
            const AppLiveInforef = admin.database().ref(`app-live-info`);
            await AppLiveInforef.update({
                "users-all": usersArray.length
            });
        } catch (error) {
            console.error(`Error in updateMembers ${error}`)
        }

    });


//Notifiction sender

export const sendNotificationsTopics = functions.database.ref('/notifications/topics')
    .onWrite((change, context) => {

        // Grab the current value of what was written to the Realtime Database.
        const snap = change.after.val();

        const obj = Object.keys(snap).map(i => snap[i])[0];
        console.log(`Notification Obj[Topic]:`, obj);

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
        return admin.messaging().send(message);
    });

export const sendNotificationsUsers = functions.database.ref('/notifications/users')
    .onWrite((change, context) => {

        // Grab the current value of what was written to the Realtime Database.
        const snap = change.after.val();

        console.log(`Notification Objbfr:`, snap);

        const snapinner = Object.keys(snap).map(i => snap[i])[0];
        const obj = Object.keys(snapinner).map(i => snapinner[i])[0];


        console.log(`Notification Obj:`, obj);



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

        return admin.messaging().send(message);
    });
