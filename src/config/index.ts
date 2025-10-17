import dotenv from 'dotenv';
dotenv.config();

// Validação explícita das variáveis de ambiente críticas
if (!process.env.JWT_SECRET) {
  throw new Error('ERRO FATAL: A variável de ambiente JWT_SECRET não está definida.');
}

if (!process.env.MONGO_URI) {
  throw new Error('ERRO FATAL: A variável de ambiente MONGO_URI não está definida.');
}

const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  
  // Agora temos certeza que a variável existe
  mongoUri: process.env.MONGO_URI,
  
  // O TypeScript agora sabe que jwtSecret é sempre uma string
  jwtSecret: process.env.JWT_SECRET,
  
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h' // Para esta, um padrão é aceitável
};

export default config;