import * as admin from 'firebase-admin';


//Notifiction sender
export const sendNotifictionMsg = (istopic, obj) => {
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

        return admin.messaging().send(message);
    }

}

export async function saveNotifications(istopic, uid, token, title, body, url) {
       // console.log(`save notification(istopic:${istopic}, uid:${uid}, token:${token}, title:${title}, body:${body}, url:${url})`);
        if (istopic) {
            const obj = {};
            obj['title'] = title;
            obj['body'] = body;
            obj['url'] = url;
            obj['date'] = admin.database.ServerValue.TIMESTAMP;
            obj['isseen'] = false;
            const msgnRef = await admin.database().ref(`notifications/topics`);
            const ref = await msgnRef.push(obj);
            const msgkey = ref.key;

            const msgnRef2 = await admin.database().ref(`notifications/topics/${msgkey}`);
            return msgnRef2.update({ id: msgkey });

        } else {
            console.log(`inside user noti`)
            if(uid !== null && uid!== undefined){
                console.log(`inside user noti: ${uid}`)
                const obj = {};
                obj['uid'] = uid;
                obj['title'] = title;
                obj['body'] = body;
                obj['url'] = url;
                obj['date'] = admin.database.ServerValue.TIMESTAMP
                obj['token'] = token;
                obj['isseen'] = false;

                
                const msgnRef = await admin.database().ref(`notifications/users/${uid}`);
                const ref = await msgnRef.push(obj);
                const msgkey = ref.key;
    
                const msgnRef2 = await admin.database().ref(`notifications/users/${uid}/${msgkey}`);
                return msgnRef2.update({ id: msgkey });
            }else{
                return null;
            }
           
        }
    

}


