import { ResultValues } from '../interfaces/result';
const path = require('path');
import * as google from '@googleapis/forms';
import { calculateGrade } from '../helpers/calculateGrade';
import { getSortedResponses } from '../helpers/getSortedResponses';
interface GoogleFormResponse {
  answers?: any;
  createTime?: string | null | undefined;
  lastSubmittedTime?: string | null | undefined;
  respondentEmail: string | null | undefined;
  responseId: string;
  totalScore: number;
}

class GoogleApiService {
  public async getGoogleFormResponse({ formId, responseId }: ResultValues) {
    console.log('google: ');
    const auth = await new google.auth.GoogleAuth({
      keyFile: path.resolve(process.cwd(), 'credentials.json'),
      scopes: ['https://www.googleapis.com/auth/forms', 'https://www.googleapis.com/auth/forms.responses.readonly'],
    });

    const forms = google.forms({
      version: 'v1',
      auth: auth,
    });
    const res = await forms.forms.responses.list({
      formId: formId,
    });

    const sortedResponses = getSortedResponses(res.data.responses);
    const lastResponse: any = (sortedResponses && sortedResponses[0]) || [];

    //Property 'totalScore' does not exist on type 'Schema$FormResponse | never[]'
    let grade = 0;

    if (lastResponse.totalScore && lastResponse.answers) {
      grade = (lastResponse.totalScore / Object.keys(lastResponse.answers).length) * 5;
    }

    const evaluation = calculateGrade(grade);

    console.log('resp: ', res.data);

    return {
      ...res.data,
      grade,
      evaluation,
    };
  }
}

export const googleApiService = new GoogleApiService();
