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
const commonfun = require("../common");
const admin = require("firebase-admin");
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
        return admin.messaging().send(message);
    }
    else {
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
    }
};
function sendNotificationsDirect(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const obj = req.body;
        if (obj.istopic) {
            sendNotifictionMsgIn(true, obj).then((response) => {
                res.status(200).send({ 'msg': "Send message to group" });
            })
                .catch((error) => {
                res.status(400).send({ 'msg': `Send Faild ${error}` });
            });
        }
        else {
            sendNotifictionMsgIn(false, obj).then((response) => {
                res.status(200).send({ 'msg': "Send message to group" });
            })
                .catch((error) => {
                res.status(400).send({ 'msg': `Send Faild ${error}` });
            });
        }
    });
}
exports.sendNotificationsDirect = sendNotificationsDirect;
function sendNotificationsAuto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.sendNotificationsAuto = sendNotificationsAuto;
//# sourceMappingURL=notifications.js.map