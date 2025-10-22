import express from 'express';
import authRouter from './routes/auth.router';
import taskRoutes from './routes/task.router'; // 1. IMPORTE AS NOVAS ROTAS
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();
app.use(express.json());

// Suas rotas
app.use('/api', authRouter);
app.use('/api/tasks', taskRoutes); // 2. ADICIONE A NOVA ROTA AQUI

app.use(errorMiddleware);

export default app;