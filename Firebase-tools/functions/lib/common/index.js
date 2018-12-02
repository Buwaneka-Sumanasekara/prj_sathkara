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
const admin = require("firebase-admin");
//Notifiction sender
exports.sendNotifictionMsg = (istopic, obj) => {
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
function saveNotifications(istopic, uid, token, title, body, url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (uid !== undefined) {
            if (istopic) {
                const obj = {};
                obj['title'] = title;
                obj['body'] = body;
                obj['url'] = url;
                obj['date'] = admin.database.ServerValue.TIMESTAMP;
                obj['isseen'] = false;
                const msgnRef = yield admin.database().ref(`notifications/topics`);
                const ref = yield msgnRef.push(obj);
                const msgkey = ref.key;
                const msgnRef2 = yield admin.database().ref(`notifications/topics/${msgkey}`);
                return msgnRef2.update({ id: msgkey });
            }
            else {
                const obj = {};
                obj['uid'] = uid;
                obj['title'] = title;
                obj['body'] = body;
                obj['url'] = url;
                obj['date'] = admin.database.ServerValue.TIMESTAMP;
                obj['token'] = token;
                obj['isseen'] = false;
                const msgnRef = yield admin.database().ref(`notifications/users/${uid}`);
                const ref = yield msgnRef.push(obj);
                const msgkey = ref.key;
                const msgnRef2 = yield admin.database().ref(`notifications/users/${uid}/${msgkey}`);
                return msgnRef2.update({ id: msgkey });
            }
        }
        else {
            return;
        }
    });
}
exports.saveNotifications = saveNotifications;
//# sourceMappingURL=index.js.map