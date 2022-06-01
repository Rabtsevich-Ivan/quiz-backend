import { Test } from '../interfaces/Test';
import { db as database } from './../app';

class TestService {
  public async createTest({
    creator,
    name,
    surname,
    numberOfQuestions,
    technologies,
    formTitle,
    formDescription,
    formLink
  }: Test) {
    return await database.collection("tests").doc().create({
      creator,
      name,
      surname,
      numberOfQuestions,
      technologies,
      formTitle,
      formDescription,
      formLink
    });
  }

  public async getTest(
    testId: string
  ) {
    const reqDoc = database.collection("tests").doc(testId);
    const test = await reqDoc.get();
    const response = test.data();

    //get form from api
    const form = `<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfbuA5jZ2DR2K4tpSI4xiSUTL6sEBeTF3328dyC4R-U__VWBQ/viewform?embedded=true" width="1000" height="800" frameborder="0" marginheight="0" marginwidth="0">Загрузка…</iframe>`;

    return {
      test: response,
      form
    }
  }

  public async getResults() {
    const query = database.collection("results");
    const results: any = [];

    await query.get().then((data: any) => {
      const docs = data.docs;

      docs.map((doc: any) => {
        results.push(doc.data());
      });
      return results;
    });

    return results;
  }
}

export const testService = new TestService();