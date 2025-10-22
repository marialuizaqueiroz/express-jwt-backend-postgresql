// import mongoose from 'mongoose';
// import config from '../config';
// import logger from '../utils/logger';

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(config.mongoUri);
//     logger.info('MongoDB connected');
//   } catch (error: any) {
//     logger.error('MongoDB connection error', error.message || error);
//     process.exit(1);
//   }
// };


// Em src/database.ts ou src/database/index.ts
import mongoose from 'mongoose';
import config from '../config';
import logger from '../utils/logger';

export const connectDB = async () => {
  try {
    logger.info('Attempting MongoDB connection with buffering disabled...');
    
    // Configurações da ligação
    const options = {
      // MUDANÇA CRUCIAL: Desativa a "fila de espera" (buffering)
      bufferCommands: false, 
    };

    // Tenta a ligação
    await mongoose.connect(config.mongoUri, options);

    // Se chegou aqui, a ligação foi um sucesso
    logger.info('MongoDB connected');

  } catch (error) {
    // Se a ligação falhar, o bufferCommands:false fará com que caia aqui
    logger.error('!!!!!!!!!! FATAL MONGODB CONNECTION ERROR !!!!!!!!!!!');
    logger.error(error); // Imprime o erro REAL (ex: AuthenticationFailed)
    
    // Força a aplicação a "crashar". A Vercel irá mostrar isto nos logs.
    process.exit(1); 
  }
};