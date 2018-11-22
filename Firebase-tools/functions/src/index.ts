import * as admin from 'firebase-admin';
import * as generalActions from './general';

// Initializes Cloud Functions.
admin.initializeApp();

exports.general_calculateExpectRecivedAmounts = generalActions.calculateExpectRecivedAmounts;
exports.general_updateMembers = generalActions.updateMembers;