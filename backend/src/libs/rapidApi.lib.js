import axios from 'axios';
import { GET_RAPID_API_LANGUAGE_ID } from '../utils/constant.js';
import { sleep } from '../utils/index.js';

export const getRapidApiLanguageId = (language) => {
  return GET_RAPID_API_LANGUAGE_ID[language.toUpperCase()];
};

export const rapidApiSubmitBatch = async (submissions) => {
  const { data } = await axios.post(
    `${process.env.RAPID_API_JUDGE0_URL}/submissions/batch?base64_encoded=false`,
    { submissions },
    {
      headers: {
        'x-rapidapi-key': process.env.RAPID_API_JUDGE0_KEY,
        'x-rapidapi-host': process.env.RAPID_API_JUDGE0_HOST,
        'Content-Type': 'application/json',
      },
    }
  );
  //   console.log('Batch submission responses', data);
  // [{token}, {token}, ...]
  return data;
};

export const rapidApiPollBatchResults = async (tokens) => {
  while (true) {
    const {
      data: { submissions },
    } = await axios.get(`${process.env.RAPID_API_JUDGE0_URL}/submissions/batch`, {
      params: {
        tokens,
        base64_encoded: false,
        fields: '*',
      },
      headers: {
        'x-rapidapi-key': process.env.RAPID_API_JUDGE0_KEY,
        'x-rapidapi-host': process.env.RAPID_API_JUDGE0_HOST,
        'Content-Type': 'application/json',
      },
    });

    // console.log('Batch poll responses', submissions);

    const isAllDone = submissions.every(({ status }) => status.id !== 1 && status.id !== 2);

    console.log(`All submissions are done: ${isAllDone}`);

    if (isAllDone) return submissions;

    await sleep(1000); // Batch polling until all submissions are done
  }
};
