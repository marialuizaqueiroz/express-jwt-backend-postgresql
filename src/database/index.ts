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
// Não precisamos mais do logger aqui, vamos usar o console
// import logger from '../utils/logger';

export const connectDB = async () => {
  try {
    // VAI APARECER NOS LOGS
    console.log('[INFO] Attempting MongoDB connection...');
    
    const options = {
      bufferCommands: false, 
    };

    await mongoose.connect(config.mongoUri, options);

    // VAI APARECER NOS LOGS
    console.log('[INFO] MongoDB connected');

  } catch (error) {
    // VAI APARECER NOS LOGS
    console.error('!!!!!!!!!! FATAL MONGODB CONNECTION ERROR !!!!!!!!!!!');
    console.error(error); // Imprime o erro REAL (ex: AuthenticationFailed)
    
    process.exit(1); 
  }
};