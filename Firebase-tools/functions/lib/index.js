"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const generalActions = require("./general");
// Initializes Cloud Functions.
admin.initializeApp();
exports.general_calculateExpectRecivedAmounts = generalActions.calculateExpectRecivedAmounts;
exports.general_updateMembers = generalActions.updateMembers;
//# sourceMappingURL=index.js.map