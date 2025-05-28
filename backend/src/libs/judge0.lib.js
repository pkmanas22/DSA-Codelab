import axios from 'axios';

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getJudge0LanguageId = (language) => {
  const JUDGE0_LANGUAGE_ID = {
    C: 50,
    CPP: 54,
    JAVA: 62,
    JAVASCRIPT: 63,
    PYTHON: 71,
  };

  return JUDGE0_LANGUAGE_ID[language.toUpperCase()];
};

export const judge0SubmitBatch = async (submissions) => {
  const { data } = await axios.post(
    `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
    {
      submissions,
    }
  );
  //   console.log('Batch submission responses', data);
  // [{token}, {token}, ...]
  return data;
};

export const judge0PollBatchResults = async (tokens) => {
  while (true) {
    const {
      data: { submissions },
    } = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
      params: {
        tokens,
        base64_encoded: false,
      },
    });

    // console.log('Batch poll responses', submissions);

    const isAllDone = submissions.every(({ status }) => status.id !== 1 && status.id !== 2);

    // console.log(`All submissions are done: ${isAllDone}`);

    if (isAllDone) return submissions;

    await sleep(1000);
  }
};
