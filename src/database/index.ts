import mongoose from 'mongoose';
import config from '../config';
import logger from '../utils/logger';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info('MongoDB connected');
  } catch (error: any) {
    logger.error('MongoDB connection error', error.message || error);
    process.exit(1);
  }
};

