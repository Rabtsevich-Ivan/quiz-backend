import { ResultValues } from '../interfaces/result';
const path = require('path');
import * as google from '@googleapis/forms';

class GoogleApiService {
  public async getGoogleFormResponse({ formId, responseId }: ResultValues) {
    console.log('google: ');
    const auth = await new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, 'credentials.json'),
      scopes: ['https://www.googleapis.com/auth/forms', 'https://www.googleapis.com/auth/forms.responses.readonly'],
    });

    const forms = google.forms({
      version: 'v1',
      auth: auth,
    });
    const res = await forms.forms.responses.list({
      formId: formId,
    });

    interface GoogleFormResponse {
      answers: any;
      createTime: string;
      lastSubmittedTime: string;
      respondentEmail: string;
      responseId: string;
      totalScore: number;
    }

    const sortedResponses = res.data.responses?.sort((a: any, b: any) =>
      new Date(a.lastSubmittedTime).getTime() > new Date(b.lastSubmittedTime).getTime() ? -1 : 1,
    );
    const lastResponse = (sortedResponses && sortedResponses[0]) || [];

    //const grade = (lastResponse?.totalScore / Object.keys(lastResponse?.answers).length) * 5;

    console.log('resp: ', res.data);

    return res.data;
  }
}

export const googleApiService = new GoogleApiService();
