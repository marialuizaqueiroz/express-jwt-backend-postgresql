import mongoose from 'mongoose';
import config from '../config';
import logger from '../utils/logger';

export const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(config.mongoUri, {
      ...options,
    });
  } catch (error: any) {
    logger.error('Erro de conexão com MongoDB:', error.message || error);
    throw error; 
  }
};

