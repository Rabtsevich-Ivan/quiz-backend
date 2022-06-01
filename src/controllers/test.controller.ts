import { Request, Response } from 'express';
import { testService } from './../services/test.service';

class TestController {
  public async createTest(req: Request, res: Response) {
    try {
      const testId = await testService.createTest({
        creator: 'testCreator',
        name: 'Me',
        surname: 'Creator',
        numberOfQuestions: 10,
        technologies: ['hands', 'arms'],
        formTitle: 'Technical Quiz',
        formDescription: 'Pass this test to show your technical knowledge',
        formLink: 'https://forms.gle/2fDwGMnj3868uhVD8'
      });

      return res.status(200).send({ status: "Success", message: "Test Saved", testId });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: "Failed", message: error });
    }
  }

  public async getTest(req: Request, res: Response) {
    try {
      const testData = await testService.getTest(req.body.testId);

      return res.status(200).send({
        status: "Success", data: testData
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: "Failed", message: error });
    }
  }

  public async getResults(req: Request, res: Response) {
    try {
      const results = await testService.getResults();

      return res.status(200).send({ status: "Success", data: results });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: "Failed", message: error });
    }
  }
}

export const testController = new TestController();