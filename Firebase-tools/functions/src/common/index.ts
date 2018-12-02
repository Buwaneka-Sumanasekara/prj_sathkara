import * as admin from 'firebase-admin';

export async function saveNotifications(istopic, uid, token, title, body,url) {
    if (istopic) {
        const obj = {};
        obj['title'] = title;
        obj['body'] = body;
        obj['url'] = url;
        obj['date'] = admin.database.ServerValue.TIMESTAMP;
        obj['isseen'] = false;
        const msgnRef = await admin.database().ref(`notifications/topics`);
        msgnRef.push(obj);   
    } else {
        const obj = {};
        obj['uid'] = uid;
        obj['title'] = title;
        obj['body'] = body;
        obj['url'] = url;
        obj['date'] = admin.database.ServerValue.TIMESTAMP
        obj['token'] = token;
        obj['isseen'] = false;
        const msgnRef = await admin.database().ref(`notifications/users/${uid}`);
        msgnRef.push(obj);
    }
}


