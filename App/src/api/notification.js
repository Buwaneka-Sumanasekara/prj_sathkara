import { WebAPI } from '../constants/firebase';

async function sendNotificationNotSaved(notif) {
    console.log(WebAPI);
    return fetch(`${WebAPI}/sendNotification`, {
        timeout: 1200 * 1000,
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },body:JSON.stringify(notif)
    });

}


export default {
    sendNotificationNotSaved
}