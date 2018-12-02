import * as functions from 'firebase-functions'
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from "cors";

import * as donationApi from './donations';
import * as notificationApi from './notifications';


const app = express();
app.use(cors())
app.get('/getdonations/:eventid', donationApi.getEventsDonations);
app.post('/sendNotification', notificationApi.sendNotificationsDirect);
app.post('/sendNotificationAuto', notificationApi.sendNotificationsAuto);


const main = express();



main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
export const webApi = functions.https.onRequest(main);