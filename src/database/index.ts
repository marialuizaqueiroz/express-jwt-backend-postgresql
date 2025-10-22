import mongoose from 'mongoose';
import config from '../config';
import logger from '../utils/logger';

export const connectDB = async () => {
  try {
    logger.info('Attempting MongoDB connection...');
    
    const options = {
      bufferCommands: false,
    };

    await mongoose.connect(config.mongoUri, options);

    logger.info('MongoDB connected');

  } catch (error) {
    logger.error('!!!!!!!!!! FATAL MONGODB CONNECTION ERROR !!!!!!!!!!!');
    logger.error(error); 
    
    process.exit(1); 
  }
};