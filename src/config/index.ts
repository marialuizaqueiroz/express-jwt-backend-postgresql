// Em src/config/index.ts
import dotenv from 'dotenv';
dotenv.config();

// Validação explícita
if (!process.env.JWT_SECRET) {
  throw new Error('ERRO FATAL: A variável de ambiente JWT_SECRET não está definida.');
}
if (!process.env.DATABASE_URL) {
  throw new Error('ERRO FATAL: A variável de ambiente DATABASE_URL não está definida.');
}

interface IConfig {
  port: number;
  jwtSecret: string;
  jwtExpiresIn: string | number; // <--- 1. CORREÇÃO AQUI
}

const config: IConfig = {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  jwtSecret: (process.env.JWT_SECRET || '') as string,
  jwtExpiresIn: (process.env.JWT_EXPIRES_IN || '1h') // <--- 2. CORREÇÃO AQUI (removido o 'as string')
};

export default config;