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


/// Em src/database.ts
import mongoose from 'mongoose';
import config from '../config';

export const connectDB = () => {
  // Isto não é mais uma função async, ela retorna uma Promessa
  console.log('[INFO] Attempting MongoDB connection...');

  const options = {
    bufferCommands: false, // Mantém o buffering desligado
  };

  // Retornamos a promessa do mongoose.connect
  return mongoose.connect(config.mongoUri, options)
    .then(() => {
      console.log('[INFO] MongoDB connected');
    })
    .catch((error) => {
      // Se falhar, imprimimos o erro e rejeitamos a promessa,
      // o que fará o .catch() no server.ts ser ativado.
      console.error('!!!!!!!!!! FATAL MONGODB CONNECTION ERROR !!!!!!!!!!!');
      console.error(error); // Imprime o erro REAL (ex: AuthenticationFailed)
      return Promise.reject(error); // Rejeita a promessa
    });
};