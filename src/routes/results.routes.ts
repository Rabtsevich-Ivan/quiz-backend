import { Router } from 'express';
import { AppQuizController } from '../controllers/quiz.controller';
import { catchRoute } from '../core/catch-route';

export const appResultsRouter = Router({ mergeParams: true });
const appQuizController = new AppQuizController();

appResultsRouter.post('/get', catchRoute(appQuizController.handleResults));
appResultsRouter.post('/set', catchRoute(appQuizController.setResultsWebhook));
