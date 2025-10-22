import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import logger from '../utils/logger';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.warn('Auth token not provided');
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

  if (!token) {
    logger.warn('Token in invalid format');
    return res.status(401).json({ message: 'Token em formato inválido' });
  }

  try {
    const secret = config.jwtSecret as jwt.Secret;
    const decoded = jwt.verify(token, secret);
    
    // Anexa o payload do token (que contém o ID do usuário) ao request
    req.user = decoded; 

    next(); // Continua para o controller
  } catch (error) {
    logger.error('Invalid auth token', error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};