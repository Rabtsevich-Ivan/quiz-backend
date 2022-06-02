import { QuizFieldsValues } from '../interfaces/quiz';
import { db as database } from './../app';

class QuizService {
  public async createQuiz({
    creator,
    name,
    surname,
    numberOfQuestions,
    technologies,
    formTitle,
    formDescription,
    formLink,
  }: QuizFieldsValues) {
    return await database.collection('tests').doc().create({
      creator,
      name,
      surname,
      numberOfQuestions,
      technologies,
      formTitle,
      formDescription,
      formLink,
    });
  }

  public async getQuiz(testId: string) {
    const reqDoc = database.collection('tests').doc(testId);
    const test = await reqDoc.get();
    const response = test.data();

    //get form from api
    const form =
      '<iframe src=\'https://docs.google.com/forms/d/e/1FAIpQLSfbuA5jZ2DR2K4tpSI4xiSUTL6sEBeTF3328dyC4R-U__VWBQ/viewform?embedded=true\' width="1000" height="800" frameborder="0" marginheight="0" marginwidth="0">Загрузка…</iframe>';

    return {
      test: response,
      form,
    };
  }

  public async getResults() {
    const response = await database.collection('results').get();
    const results = response.docs.map(doc => {
      const data = doc.data();
      return data;
    });

    return results;
  }
}

export const testService = new QuizService();
