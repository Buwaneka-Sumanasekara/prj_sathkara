"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const donationApi = require("./donations");
const app = express();
app.use(cors());
app.get('/getdonations/:eventid', donationApi.getEventsDonations);
const main = express();
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
exports.webApi = functions.https.onRequest(main);
//# sourceMappingURL=index.js.map