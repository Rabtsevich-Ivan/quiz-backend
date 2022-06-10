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

    console.log('resp: ', res.data);

    return res.data;
  }
}

export const googleApiService = new GoogleApiService();
