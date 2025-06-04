import express from 'express';
import { authMiddleware, checkAdmin } from '../middlewares/auth.middleware.js';
import {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
} from '../controllers/problem.controller.js';

const problemRoutes = express.Router();

problemRoutes.post('/create-problem', authMiddleware, checkAdmin, createProblem);

problemRoutes.patch('/update-problem/:problemId', authMiddleware, checkAdmin, updateProblem);

problemRoutes.delete('/delete-problem/:problemId', authMiddleware, checkAdmin, deleteProblem);

problemRoutes.get('/get-all-problems', getAllProblems);

problemRoutes.get('/get-problem/:problemId', getProblemById);

export default problemRoutes;
