import * as google from '@googleapis/forms';

export const getSortedResponses = (responses: google.forms_v1.Schema$FormResponse[] | undefined) => {
  return responses?.sort((a: any, b: any) =>
    new Date(a.lastSubmittedTime).getTime() > new Date(b.lastSubmittedTime).getTime() ? -1 : 1,
  );
};
