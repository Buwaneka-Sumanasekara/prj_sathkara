"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const generalActions = require("./general");
const api = require("./api");
// Initializes Cloud Functions.
admin.initializeApp();
exports.general_calculateExpectRecivedAmounts = generalActions.calculateExpectRecivedAmounts;
exports.general_updateMembers = generalActions.updateMembers;
exports.general_sendNotificationsUsers = generalActions.sendNotificationsUsers;
exports.general_sendNotificationsTopics = generalActions.sendNotificationsTopics;
exports.general_sendDonationNotifications = generalActions.sendDonationNotifications;
//API
exports.webApi = api.webApi;
//# sourceMappingURL=index.js.map