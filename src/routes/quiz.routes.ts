import { Router } from 'express';
import { AppQuizController } from '../controllers/quiz.controller';
import { catchRoute } from '../core/catch-route';

export const appQuizRouter = Router();
const appQuizController = new AppQuizController();

appQuizRouter.get('/create', catchRoute(appQuizController.createQuiz));
appQuizRouter.get('/get', catchRoute(appQuizController.getQuiz));
