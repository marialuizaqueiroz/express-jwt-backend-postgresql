import app from './app';
import config from './config';
import { connectDB } from './database';
import logger from './utils/logger';

const start = async () => {
  await connectDB();
  app.listen(config.port, () => logger.info(`Server running on port ${config.port}`));
};

start();
