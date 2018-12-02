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
function saveNotifications(istopic, uid, token, title, body, url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (istopic) {
            const obj = {};
            obj['title'] = title;
            obj['body'] = body;
            obj['url'] = url;
            obj['date'] = admin.database.ServerValue.TIMESTAMP;
            obj['isseen'] = false;
            const msgnRef = yield admin.database().ref(`notifications/topics`);
            msgnRef.push(obj);
        }
        else {
            const obj = {};
            obj['uid'] = uid;
            obj['title'] = title;
            obj['body'] = body;
            obj['url'] = url;
            obj['date'] = admin.database.ServerValue.TIMESTAMP;
            obj['token'] = token;
            obj['isseen'] = false;
            const msgnRef = yield admin.database().ref(`notifications/users/${uid}`);
            msgnRef.push(obj);
        }
    });
}
exports.saveNotifications = saveNotifications;
//# sourceMappingURL=index.js.map