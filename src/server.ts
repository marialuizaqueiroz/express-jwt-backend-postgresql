// import app from './app';
// import config from './config';
// import { connectDB } from './database';
// import logger from './utils/logger';

// const start = async () => {
//   await connectDB();
//   app.listen(config.port, () => logger.info(`Server running on port ${config.port}`));
// };

// start();

// Em src/server.ts
import app from './app';
import config from './config';
import { connectDB } from './database';
import logger from './utils/logger'; // O logger original

const start = () => {
  connectDB()
    .then(() => {
      // Só inicia o servidor se a BD ligar com sucesso
      app.listen(config.port, () => {
        logger.info(`Server running on port ${config.port}`);
      });
    })
    .catch((err) => {
      // Se a connectDB() falhar, o servidor nem arranca.
      logger.error('Failed to start server due to DB connection error', err);
      process.exit(1); // Agora o crash acontece aqui, DEPOIS do logger.
    });
};

start();