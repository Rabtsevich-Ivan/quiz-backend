import { Router } from 'express';
import { AppQuizController } from '../controllers/quiz.controller';
import { catchRoute } from '../core/catch-route';

export const appResultsRouter = Router({ mergeParams: true });
const appQuizController = new AppQuizController();

appResultsRouter.get('/get', catchRoute(appQuizController.getResults));
