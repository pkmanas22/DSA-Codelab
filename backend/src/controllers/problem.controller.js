import {
  getJudge0LanguageId,
  judge0PollBatchResults,
  judge0SubmitBatch,
} from '../libs/judge0.lib.js';

import { db } from '../libs/db.js';

export const createProblem = async (req, res) => {
  /*
   * 1. Get all fields from body
   * 2. check user role again
   * 3. loop through each reference solution for different languages
   *
   * 3.1 get judge0 language id for current language
   * 3.2 prepare judge0 submission for all testcases
   * 3.3 submit all testcases to judge0 in one batch
   * 3.4 extract tokens from response with comma separated
   * 3.5 poll judge0 until all submissions are finished
   * 3.6 validate all submissions (status.id !== 1 && status.id !== 2)
   *
   * 4. save the problem in database after all reference solutions are passed
   * 5. return success message
   *
   *
   * referenceSolution = { python: "print('hello')", java: "System.out.println('hello')", javascript: "console.log('hello')" }
   */

  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    companies,
    hints,
    editorial,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      error: 'You are not allowed to create a problem.',
    });
  }

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = await getJudge0LanguageId(language);
      //   console.log(languageId);
      if (!languageId) {
        return res.status(400).json({
          success: false,
          error: `Language ${language} is not supported.`,
        });
      }

      const submissions = testcases.map(({ input, output }) => ({
        language_id: languageId,
        source_code: solutionCode,
        stdin: input,
        expected_output: output,
      }));
      //   console.log('Submissions', submissions);

      const submissionResponses = await judge0SubmitBatch(submissions); // return tokens

      const submissionToken = submissionResponses.map(({ token }) => token).join(',');
      //   console.log('Submission token', submissionToken);

      const submissionsResults = await judge0PollBatchResults(submissionToken);

      //   console.log('Submissions Results', submissionsResults);

      submissionsResults.forEach((result, idx) => {
        //   console.log(`Testcase ${idx + 1} on language ${language} - ${JSON.stringify(result)}`);

        if (result.status.id !== 3) {
          return res.status(400).json({
            success: false,
            error: `Testcase ${idx + 1} failed for language ${language}. Description: ${
              result.status.description
            }. Reason: ${result.message}`,
          });
        }
      });

      //   console.log('All testcases passed');
      // save to db
      const newProblem = await db.Problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          companies,
          hints,
          editorial,
          testcases,
          codeSnippets,
          referenceSolutions,
          userId: req.user.id,
        },
      });

      return res.status(201).json({
        success: true,
        message: 'Problem created successfully.',
        data: newProblem,
      });
    }
  } catch (error) {
    console.log('Error while creating problem', error);
    return res.status(500).json({
      success: false,
      error: 'Error while creating problem.',
    });
  }
};

export const getAllProblems = async (req, res) => {};

export const getProblemById = async (req, res) => {};

export const updateProblem = async (req, res) => {};

export const deleteProblem = async (req, res) => {};
