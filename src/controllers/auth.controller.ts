
import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import jwt from 'jsonwebtoken';
import config from '../config';
import logger from '../utils/logger';
import bcrypt from 'bcryptjs'; // <-- 1. IMPORTE O BCRYPT (já deve estar instalado)

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // A sua validação (está perfeita)
    if (!name || name.length < 2) return res.status(422).json({ message: 'Nome inválido' });
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(422).json({ message: 'E-mail inválido' });
    if (!password || password.length < 6) return res.status(422).json({ message: 'Senha inválida (mínimo 6 caracteres)' });

    // --- CORREÇÃO AQUI ---

    // 2. Faça o HASH da senha (como no projeto antigo)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Crie o OBJETO de input
    const userInput = {
      name: name,
      email: email,
      password: hashedPassword
    };

    // 4. Envie o OBJETO para o serviço
    //    (O erro estava nesta linha)
    const user = await userService.createUser(userInput); 

    // --- FIM DA CORREÇÃO ---

    logger.info('User registered', email);
    return res.status(201).json({
      message: 'Criado com sucesso',
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err: any) {
    logger.error('Register error', err.message || err);

    // Bónus: Captura erro de e-mail duplicado do Prisma
    if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
      return res.status(409).json({ message: 'Este e-mail já está em uso' });
    }
    
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || 'Erro interno' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(422).json({ message: 'E-mail e senha são obrigatórios' });

    // --- CORREÇÃO AQUI TAMBÉM ---
    
    // 1. O nosso novo serviço SÓ aceita 'email'
    const user = await userService.findUserByEmail(email);
    if (!user)
      return res.status(404).json({ message: 'Usuário não encontrado' });

    // 2. A comparação da senha AGORA é feita no controller
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: 'Senha inválida' });

    // --- FIM DA CORREÇÃO ---

    const secret: jwt.Secret = config.jwtSecret as jwt.Secret;

    const token = jwt.sign( 
      { sub: user.id, email: user.email },
      secret,
      { expiresIn: '1h' } 
    );

    logger.info('User logged in', email);
    return res.json({ token });
  } catch (err: any) {
    logger.error('Login error', err.message || err);
    return res.status(500).json({ message: 'Erro interno' });
  }
};

// Esta rota não é usada, mas pode ficar
export const protectedRoute = async (req: Request, res: Response) => {
  return res.json({ message: 'Acesso autorizado' });
};