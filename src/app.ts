import * as cors from 'cors';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";
import * as serviceAccount from './../service-account-key.json';
import * as dotenv from 'dotenv';
import { testController } from './controllers/test.controller';

// Init
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: serviceAccount.client_email,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    projectId: serviceAccount.project_id,
  }),
  storageBucket: 'gs://quiz-dev-ddd1b.appspot.com',
});
export const db = admin.firestore();

const createTest = express();
const getTest = express();
const getResults = express();

createTest.use(cors({ origin: true }));
getTest.use(cors({ origin: true }));
getResults.use(cors({ origin: true }));

// Functions
createTest.get("/", testController.createTest);
getTest.get("/", testController.getTest);
getResults.get("/", testController.getResults);

// Exports api to the firebase cloud functions
exports.createTest = functions.https.onRequest(createTest);
exports.getTest = functions.https.onRequest(getTest);
exports.getResults = functions.https.onRequest(getResults);