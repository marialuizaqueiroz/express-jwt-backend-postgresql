import express from 'express';
import authRouter from './routes/auth.router';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();
app.use(express.json());

app.use('/api', authRouter);

app.use(errorMiddleware);

export default app;
