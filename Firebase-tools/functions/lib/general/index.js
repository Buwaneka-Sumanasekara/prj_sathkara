"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.calculateExpectRecivedAmounts = functions.database.ref('/donations')
    .onWrite((evt) => __awaiter(this, void 0, void 0, function* () {
    const eventsref = admin.database().ref(`events`);
    const snapshot = yield eventsref.orderByChild('active').equalTo(true).once("value");
    let liveEvent = null;
    for (const key in snapshot.val()) {
        liveEvent = snapshot.val()[key];
    }
    try {
        const donations = yield admin.database().ref(`donations/${liveEvent.id}`).once("value");
        let expectAmount = 0;
        let recivedAmount = 0;
        const donationsArray = Object.keys(donations.val()).map(i => donations.val()[i]);
        for (let userdonations of donationsArray) {
            const transactionsArray = Object.keys(userdonations).map(i => userdonations[i]);
            //console.log(transactionsArray); 
            for (let transaction of transactionsArray) {
                if (transaction['donation-state'] === 1) {
                    recivedAmount += transaction.amount;
                }
                else if (transaction['donation-state'] === 0) {
                    expectAmount += transaction.amount;
                }
            }
        }
        console.log(`Expect:${expectAmount}, recived:${recivedAmount}`);
        const evntref = admin.database().ref(`events/${liveEvent.id}`);
        yield evntref.update({
            "total-expect": expectAmount,
            "total-recived": recivedAmount,
            "total-contributors": donationsArray.length
        });
    }
    catch (error) {
        const evntref = admin.database().ref(`events/${liveEvent.id}`);
        yield evntref.update({
            "total-expect": 0,
            "total-recived": 0,
            "total-contributors": 0
        });
    }
}));
exports.updateMembers = functions.database.ref('/user')
    .onWrite((evt) => __awaiter(this, void 0, void 0, function* () {
    try {
        const users = yield admin.database().ref(`user`).once("value");
        const usersArray = Object.keys(users.val()).map(i => users.val()[i]);
        console.log(`Member updated! Members:${usersArray.length}`);
        const AppLiveInforef = admin.database().ref(`app-live-info`);
        yield AppLiveInforef.update({
            "users-all": usersArray.length
        });
    }
    catch (error) {
        console.error(`Error in updateMembers ${error}`);
    }
}));
//# sourceMappingURL=index.js.map