import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { executeCodeForRun, executeCodeForSubmit } from '../controllers/executeCode.controller.js';

const executeCodeRoutes = express.Router();

executeCodeRoutes.post('/run', authMiddleware, executeCodeForRun);
executeCodeRoutes.post('/submit', authMiddleware, executeCodeForSubmit);

export default executeCodeRoutes;
