import * as admin from 'firebase-admin';
import * as generalActions from './general';
import * as api from './api';

// Initializes Cloud Functions.
admin.initializeApp();

exports.general_calculateExpectRecivedAmounts = generalActions.calculateExpectRecivedAmounts;
exports.general_updateMembers = generalActions.updateMembers;
exports.general_sendNotificationsUsers=generalActions.sendNotificationsUsers;
exports.general_sendNotificationsTopics=generalActions.sendNotificationsTopics;

//API
exports.webApi = api.webApi;