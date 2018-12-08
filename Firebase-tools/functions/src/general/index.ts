import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as _ from 'lodash';
import * as commonfun from '../common';


const sendNotifictionMsgIn = (istopic, obj) => {
    if (istopic) {
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
        console.log(`Send Topic notification:${JSON.stringify(message)}`);
        return admin.messaging().send(message);
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

        console.log(`Send User notification:${JSON.stringify(message)}`);
        return admin.messaging().send(message);
    }

}



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





export const sendDonationNotifications = functions.database.ref('/donations')
    .onWrite(async (change, context) => {

        if (change.before.exists()) {
            const snap = change.after.val();


            console.log(`Donation NotifObj:`, snap);
            const snapinner = Object.keys(snap).map(i => snap[i]);
            const mdsnapinner = snapinner[snapinner.length - 1];
            const secobj = Object.keys(mdsnapinner).map(i => mdsnapinner[i]);
            const mdsecobj = secobj[secobj.length - 1];
            const prvobj = Object.keys(mdsecobj).map(i => mdsecobj[i]);
            const obj = prvobj[prvobj.length - 1];
            console.log(`Donation Notif:`, obj);

            //  const donationref = await admin.database().ref(`donations/${obj.id}`).once("value");
            console.log(`donation id: ${obj.id}`);
            if (obj.id === undefined) {
                const user = await admin.database().ref(`user/${obj.uid}`).once("value");
                const userobj = user.val();

                const msgobj = {};
                msgobj['title'] = 'Donations Alert';
                msgobj['body'] = `${userobj.fname} donated ${obj.amount} LKR for sathkara Event! `;
                msgobj['url'] = 'http://teamsathkara.org/donations';
                //return commonfun.sendNotifictionMsg(true,msgobj);
                return sendNotifictionMsgIn(true, msgobj);
            } else {
                return null;
            }



        } else {
            return null;
        }


    });





export const sendNotificationsTopics = functions.database.ref('/notifications/topics')
    .onWrite((change, context) => {
        if (change.before.exists()) {
            //const snap = change.after.val();
            // Grab the current value of what was written to the Realtime Database.
            const snap = change.after.val();

            const snapinner = Object.keys(snap).map(i => snap[i]);
            const obj = snapinner[snapinner.length - 1];

            console.log(`Notification Obj[Topic]:`, obj);

            if (obj.id === undefined) {
                return sendNotifictionMsgIn(true, obj);
                }else{
                    return null;
                }
        } else {
            return null;
        }
    });

export const sendNotificationsUsers = functions.database.ref('/notifications/users')
    .onWrite((change, context) => {
        if (change.before.exists()) {
            //const snap = change.after.val();
            // Grab the current value of what was written to the Realtime Database.
            const snap = change.after.val();

            console.log(`Notification Objbfr:`, snap);


            const snapinner = Object.keys(snap).map(i => snap[i]);
            const mdsnapinner = snapinner[snapinner.length - 1];
            const secobj = Object.keys(mdsnapinner).map(i => mdsnapinner[i]);
            const obj = secobj[secobj.length - 1];
           


            console.log(`Notification Obj:`, obj);

            // return commonfun.sendNotifictionMsg(false,obj);
            if (obj.id === undefined) {
            return sendNotifictionMsgIn(false, obj);
            }else{
                return null;
            }
        } else {
            return null;
        }

    });
