import { Request, Response } from 'express';
import { sendError } from '../core/response-helper';
import { googleApiService } from '../services/googleApi.service';
import { quizService } from './../services/quiz.service';

export class AppQuizController {
  public async createQuiz(req: Request, res: Response): Promise<void> {
    //const { creator, name, surname, numberOfQuestions, technologies, formTitle, formDescription, formLink } = req.body;
    try {
      const testId = await quizService.createQuiz({
        creator: 'testCreator',
        name: 'Me',
        surname: 'Creator',
        numberOfQuestions: 10,
        technologies: ['hands', 'arms'],
        formTitle: 'Technical Quiz',
        formDescription: 'Pass this test to show your technical knowledge',
        formLink: 'https://forms.gle/2fDwGMnj3868uhVD8',
      });

      res.status(200).send({ status: 'Success', message: 'Test Saved', testId });
      return;
    } catch (error) {
      sendError(res, 'Failed creating quiz', 500);
      return;
    }
  }

  public async getQuiz(req: Request, res: Response): Promise<void> {
    try {
      const testData = await quizService.getQuiz(req.body.testId);

      res.status(200).send({
        status: 'Success',
        data: testData,
      });
      return;
    } catch (error) {
      sendError(res, 'Failed getting quiz', 500);
      return;
    }
  }

  public async handleResults(req: Request, res: Response): Promise<void> {
    try {
      const resultReference = await quizService.getResultReference(req.body.passingTestId);

      const response = await googleApiService.getGoogleFormResponse(resultReference);

      quizService.storeResult(response);

      console.log(response);

      res.status(200).send({ status: 'Success', data: response });
      return;
    } catch (error) {
      sendError(res, 'Failed getting results', 500);
      console.log(error);
      return;
    }
  }

  public async setResultsWebhook(req: Request, res: Response): Promise<void> {
    try {
      const results = req.body;

      console.log(results);

      quizService.setResultReference(results);

      res.status(200).send({ status: 'Success', data: results });
      return;
    } catch (error) {
      console.log('Error setting results');
      return;
    }
  }
}
