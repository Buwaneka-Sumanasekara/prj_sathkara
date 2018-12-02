"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.calculateExpectRecivedAmounts = functions.database.ref('/donations')
    .onWrite((evt) => __awaiter(this, void 0, void 0, function* () {
    const eventsref = admin.database().ref(`events`);
    const snapshot = yield eventsref.orderByChild('active').equalTo(true).once("value");
    let liveEvent = null;
    for (const key in snapshot.val()) {
        liveEvent = snapshot.val()[key];
    }
    try {
        const donations = yield admin.database().ref(`donations/${liveEvent.id}`).once("value");
        let expectAmount = 0;
        let recivedAmount = 0;
        const donationsArray = Object.keys(donations.val()).map(i => donations.val()[i]);
        for (const userdonations of donationsArray) {
            const transactionsArray = Object.keys(userdonations).map(i => userdonations[i]);
            //console.log(transactionsArray); 
            for (const transaction of transactionsArray) {
                if (transaction['donation-state'] === 1) {
                    recivedAmount += transaction.amount;
                }
                else if (transaction['donation-state'] === 0) {
                    expectAmount += transaction.amount;
                }
            }
        }
        console.log(`Expect:${expectAmount}, recived:${recivedAmount}`);
        const evntref = admin.database().ref(`events/${liveEvent.id}`);
        yield evntref.update({
            "total-expect": expectAmount,
            "total-recived": recivedAmount,
            "total-contributors": donationsArray.length
        });
    }
    catch (error) {
        const evntref = admin.database().ref(`events/${liveEvent.id}`);
        yield evntref.update({
            "total-expect": 0,
            "total-recived": 0,
            "total-contributors": 0
        });
    }
}));
exports.updateMembers = functions.database.ref('/user')
    .onWrite((evt) => __awaiter(this, void 0, void 0, function* () {
    try {
        const users = yield admin.database().ref(`user`).once("value");
        const usersArray = Object.keys(users.val()).map(i => users.val()[i]);
        console.log(`Member updated! Members:${usersArray.length}`);
        const AppLiveInforef = admin.database().ref(`app-live-info`);
        yield AppLiveInforef.update({
            "users-all": usersArray.length
        });
    }
    catch (error) {
        console.error(`Error in updateMembers ${error}`);
    }
}));
//Notifiction sender
exports.sendNotificationsTopics = functions.database.ref('/notifications/topics')
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
exports.sendNotificationsUsers = functions.database.ref('/notifications/users')
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
//# sourceMappingURL=index.js.map