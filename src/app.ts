import express from "express";
import cors from 'cors';
import config from "./config";
import { connectDB } from "./database";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRouter from "./routes/auth.router";
import taskRoutes from "./routes/task.router"; 
import logger from "./utils/logger";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", authRouter);
app.use("/api/tasks", taskRoutes); 

app.use(errorMiddleware);
try {
  logger.info("🔍 Tentando conectar ao POSTGRESQL...");
  connectDB();
  logger.info("✅ Conexão com POSTGRESQL estabelecida!");

  app.listen(config.port, () =>
    logger.info(`🚀 Servidor rodando na porta ${config.port}`)
  );
} catch (error: any) {
  logger.error("❌ Falha ao conectar ao POSTGRESQL:", error.message || error);
  // process.exit(1); 
}