import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  getAllSubmissions,
  getSubmissionByProblemId,
  getTotalSubmissionsCountByProblemId,
} from '../controllers/submission.controller.js';

const submissionRoutes = express.Router();

submissionRoutes.get('/get-all-submissions', authMiddleware, getAllSubmissions);
submissionRoutes.get('/get-submission/:problemId', authMiddleware, getSubmissionByProblemId);
submissionRoutes.get(
  '/get-submissions-count/:problemId',
  authMiddleware,
  getTotalSubmissionsCountByProblemId
);

export default submissionRoutes;
