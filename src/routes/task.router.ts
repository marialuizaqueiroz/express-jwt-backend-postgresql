import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operações relacionadas às tarefas (CRUD)
 */

// Todas as rotas exigem autenticação
router.use(authMiddleware);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     description: Cria uma nova tarefa associada ao usuário autenticado.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Estudar PostgreSQL
 *               description:
 *                 type: string
 *                 example: Revisar comandos básicos de SQL
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Erro nos dados enviados
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Lista todas as tarefas do usuário autenticado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 title: Estudar PostgreSQL
 *                 description: Revisar comandos básicos de SQL
 *                 completed: false
 *       401:
 *         description: Token ausente ou inválido
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Retorna uma tarefa específica
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *       404:
 *         description: Tarefa não encontrada
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Atualiza todos os campos de uma tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarefa atualizada
 *       404:
 *         description: Tarefa não encontrada
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Atualiza parcialmente uma tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               completed: true
 *     responses:
 *       200:
 *         description: Tarefa atualizada parcialmente
 *       404:
 *         description: Tarefa não encontrada
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Exclui uma tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       204:
 *         description: Tarefa excluída com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTaskById);
router.patch('/:id', taskController.updateTaskById);
router.delete('/:id', taskController.deleteTaskById);

export default router;
