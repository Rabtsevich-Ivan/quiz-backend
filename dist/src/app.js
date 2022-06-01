"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const cors = require("cors");
const express = require("express");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const serviceAccount = require("./../service-account-key.json");
const dotenv = require("dotenv");
const test_controller_1 = require("./controllers/test.controller");
// Init
dotenv.config();
admin.initializeApp({
    credential: admin.credential.cert({
        clientEmail: serviceAccount.client_email,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        projectId: serviceAccount.project_id,
    }),
    storageBucket: 'gs://quiz-dev-ddd1b.appspot.com',
});
exports.db = admin.firestore();
const createTest = express();
const getTest = express();
const getResults = express();
createTest.use(cors({ origin: true }));
getTest.use(cors({ origin: true }));
getResults.use(cors({ origin: true }));
// Functions
createTest.get("/", test_controller_1.testController.createTest);
getTest.get("/", test_controller_1.testController.getTest);
getResults.get("/", test_controller_1.testController.getResults);
// Exports api to the firebase cloud functions
exports.createTest = functions.https.onRequest(createTest);
exports.getTest = functions.https.onRequest(getTest);
exports.getResults = functions.https.onRequest(getResults);
//# sourceMappingURL=app.js.map