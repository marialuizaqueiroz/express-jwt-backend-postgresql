import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rotas de autenticação e acesso protegido
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Registra um novo usuário com nome, email e senha.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maria Luiza
 *               email:
 *                 type: string
 *                 example: maria@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Usuário registrado com sucesso
 *       400:
 *         description: Erro na validação ou e-mail já cadastrado
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login e retorna token JWT
 *     description: Realiza autenticação de usuário com email e senha.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: maria@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /auth/protected:
 *   get:
 *     summary: Rota protegida
 *     description: Apenas usuários autenticados com token JWT podem acessar.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acesso permitido
 *         content:
 *           application/json:
 *             example:
 *               message: Você acessou uma rota protegida!
 *       401:
 *         description: Token ausente ou inválido
 */

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/protected', authMiddleware, authCtrl.protectedRoute);

export default router;
