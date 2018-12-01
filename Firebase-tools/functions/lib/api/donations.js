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
const admin = require("firebase-admin");
function getEventsDonations(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eventid = req.params.eventid;
            if (eventid !== undefined) {
                const donations = yield admin.database().ref(`donations/${eventid}`).once("value");
                const donationsArray = Object.keys(donations.val()).map(i => donations.val()[i]);
                const PendingAr = [];
                const OtherAr = [];
                for (let userdonations of donationsArray) {
                    const transactionsArray = Object.keys(userdonations).map(i => userdonations[i]);
                    //console.log(transactionsArray); 
                    for (let transaction of transactionsArray) {
                        const user = yield admin.database().ref(`user/${transaction.uid}`).once("value");
                        transaction['user'] = user.val();
                        if (transaction['donation-state'] === 0) {
                            PendingAr.push(transaction);
                        }
                        else {
                            OtherAr.push(transaction);
                        }
                    }
                }
                const resObj = {};
                resObj['msg'] = 'Success';
                resObj['pending_ar'] = PendingAr;
                resObj['other_ar'] = OtherAr;
                res.status(200).send(resObj);
            }
            else {
                res.status(500).send({ 'msg': "Missing parameters" });
            }
        }
        catch (error) {
            res.status(500).send({ 'msg': `Something wrong in ur request:${error} ` });
        }
    });
}
exports.getEventsDonations = getEventsDonations;
//# sourceMappingURL=donations.js.map