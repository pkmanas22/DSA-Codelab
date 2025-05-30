import { db } from '../libs/db.js';

export const getAllSubmissions = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const allSubmissions = await db.Submission.findMany({
      where: { userId },
    });

    return res.status(200).json({
      success: true,
      message: 'All submissions fetched successfully.',
      data: allSubmissions,
    });
  } catch (error) {
    console.log('Error while fetching all submissions', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error.',
    });
  }
};

export const getSubmissionByProblemId = async (req, res) => {
  const { problemId } = req.params;
  const { id: userId } = req.user;

  try {
    const submissions = await db.Submission.findMany({
      where: {
        userId,
        problemId,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Submissions fetched successfully.',
      data: submissions,
    });
  } catch (error) {
    console.log('Error while fetching submissions', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error.',
    });
  }
};

export const getTotalSubmissionsCountByProblemId = async (req, res) => {
  const { problemId } = req.params;
  try {
    const submissionsCount = await db.Submission.count({
      where: { problemId },
    });

    return res.status(200).json({
      success: true,
      message: 'Submissions count fetched successfully.',
      data: submissionsCount,
    });
  } catch (error) {
    console.log('Error while fetching submissions count', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error.',
    });
  }
};
