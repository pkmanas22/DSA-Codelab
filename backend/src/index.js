import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// routes
import authRoutes from './routes/auth.route.js';
import problemRoutes from './routes/problem.route.js';
import executeCodeRoutes from './routes/executeCode.route.js';
import submissionRoutes from './routes/submission.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
  })
);

app.get('/', (_, res) => {
  res.send('Welcome to DeepCodeLab server.');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/problem', problemRoutes);
app.use('/api/v1/execute-code', executeCodeRoutes);
app.use('/api/v1/submission', submissionRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
