import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Todas as rotas /api/tasks/* daqui para baixo exigirão um token JWT válido
router.use(authMiddleware);

// POST /api/tasks
router.post('/', taskController.createTask);

// GET /api/tasks
router.get('/', taskController.getTasks);

// GET /api/tasks/:id
router.get('/:id', taskController.getTaskById);

// PUT /api/tasks/:id
router.put('/:id', taskController.updateTaskById);

// PATCH /api/tasks/:id
router.patch('/:id', taskController.updateTaskById);

// DELETE /api/tasks/:id
router.delete('/:id', taskController.deleteTaskById);

export default router;