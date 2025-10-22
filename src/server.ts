// import app from './app';
// import config from './config';
// import { connectDB } from './database';
// import logger from './utils/logger';

// const start = async () => {
//   await connectDB();
//   app.listen(config.port, () => logger.info(`Server running on port ${config.port}`));
// };

// start();

// import app from './app';
// import config from './config';
// import { connectDB } from './database';
// import logger from './utils/logger';

// const start = async () => {
//   try {
//     logger.info('🔍 Tentando conectar ao MongoDB...');
//     await connectDB({
//       serverSelectionTimeoutMS: 30000, // espera até 30s para o cluster responder
//       socketTimeoutMS: 45000,          // previne desconexões rápidas
//     });
//     logger.info('✅ Conexão com MongoDB estabelecida!');

//     app.listen(config.port, () =>
//       logger.info(`🚀 Servidor rodando na porta ${config.port}`)
//     );
//   } catch (error: any) {
//     logger.error('❌ Falha ao conectar ao MongoDB:', error.message || error);
//     process.exit(1); // encerra o app se não conectar
//   }
// };

// start();
