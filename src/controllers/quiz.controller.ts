import { Request, Response } from 'express';
import { sendError } from '../core/response-helper';
import { testService } from './../services/quiz.service';

export class AppQuizController {
  public async createQuiz(req: Request, res: Response): Promise<void> {
    //const { creator, name, surname, numberOfQuestions, technologies, formTitle, formDescription, formLink } = req.body;
    try {
      const testId = await testService.createQuiz({
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
      const testData = await testService.getQuiz(req.body.testId);

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

  public async getResults(req: Request, res: Response): Promise<void> {
    try {
      const results = await testService.getResults();

      res.status(200).send({ status: 'Success', data: results });
      return;
    } catch (error) {
      sendError(res, 'Failed getting results', 500);
      return;
    }
  }
}
