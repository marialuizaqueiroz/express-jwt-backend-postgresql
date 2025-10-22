// import dotenv from 'dotenv';
// dotenv.config();

// // Validação explícita das variáveis de ambiente críticas
// if (!process.env.JWT_SECRET) {
//   throw new Error('ERRO FATAL: A variável de ambiente JWT_SECRET não está definida.');
// }

// if (!process.env.MONGO_URI) {
//   throw new Error('ERRO FATAL: A variável de ambiente MONGO_URI não está definida.');
// }

// interface IConfig {
//   port: number;
//   mongoUri: string;
//   jwtSecret: string;
//   jwtExpiresIn: string;
// }

// const config: IConfig = {
//   port: process.env.PORT ? Number(process.env.PORT) : 4000,

//   // Agora temos certeza que a variável existe (validação acima)
//   mongoUri: process.env.MONGO_URI as string,

//   // Asserções para garantir que o tipo exportado é string
//   jwtSecret: process.env.JWT_SECRET as string,

//   jwtExpiresIn: (process.env.JWT_EXPIRES_IN || '1h') as string
// };

// export default config;

import dotenv from 'dotenv';
dotenv.config();

// Validação explícita das variáveis de ambiente críticas
/* // REMOVA TEMPORARIAMENTE ESTA VERIFICAÇÃO PARA DEPURAÇÃO
if (!process.env.JWT_SECRET) {
  throw new Error('ERRO FATAL: A variável de ambiente JWT_SECRET não está definida.');
}

if (!process.env.MONGO_URI) {
  throw new Error('ERRO FATAL: A variável de ambiente MONGO_URI não está definida.');
}
*/ // FIM DA REMOÇÃO

interface IConfig {
  port: number;
  mongoUri: string;
  jwtSecret: string;
  jwtExpiresIn: string;
}

const config: IConfig = {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,

  // Agora as variáveis podem ser 'undefined', mas o nosso connectDB vai apanhar
  mongoUri: (process.env.MONGO_URI || '') as string,

  jwtSecret: (process.env.JWT_SECRET || '') as string,

  jwtExpiresIn: (process.env.JWT_EXPIRES_IN || '1h') as string
};

export default config;