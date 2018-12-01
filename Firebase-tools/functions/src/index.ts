import * as admin from 'firebase-admin';
import * as generalActions from './general';
import * as api from './api';

// Initializes Cloud Functions.
admin.initializeApp();

exports.general_calculateExpectRecivedAmounts = generalActions.calculateExpectRecivedAmounts;
exports.general_updateMembers = generalActions.updateMembers;

//API
exports.webApi = api.webApi;