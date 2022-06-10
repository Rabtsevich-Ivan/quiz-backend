import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as serviceAccount from './../service-account-key.json';
import * as dotenv from 'dotenv';
import * as http from 'http';
import { appResultsRouter } from './routes/results.routes';
import { appQuizRouter } from './routes/quiz.routes';
import { Request, Response } from 'express';
// Init
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: serviceAccount.client_email,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    projectId: serviceAccount.project_id,
  }),
  storageBucket: 'gs://quiz-dev-ddd1b.appspot.com',
});
export const db = admin.firestore();
class App {
  public app: express.Application;
  public server: http.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    //appSocketService.init(this.server);
    this.config();
  }

  private config(): void {
    this.app.use(bodyParser.json());

    const corsOptions: cors.CorsOptions = {
      origin: ['http://localhost:4200', 'http://localhost:3000', 'https://protected-caverns-06414.herokuapp.com'],
    };
    this.app.use(cors(corsOptions));

    this.app.use('/quiz', appQuizRouter);
    this.app.use('/results', appResultsRouter);

    // this.app.use('/form', async (req, res) => {
    //   try {
    //     const forms = google.forms({
    //       version: 'v1',
    //       auth: auth,
    //     });
    //     const res = await forms.forms.responses.get({
    //       formId: formID,

    //       responseId: responseID,
    //     });
    //   } catch (error) {}
    // });

    // eslint-disable-next-line
    this.app.use((err: any, req: Request, res: Response, next: any) => {
      if (err) {
        res.status(500).send('Something went wrong!');
      }
    });
  }
}

const app = new App();
export default app;
