"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const generalActions = require("./general");
const api = require("./api");
// Initializes Cloud Functions.
admin.initializeApp();
exports.general_calculateExpectRecivedAmounts = generalActions.calculateExpectRecivedAmounts;
exports.general_updateMembers = generalActions.updateMembers;
//API
exports.webApi = api.webApi;
//# sourceMappingURL=index.js.map