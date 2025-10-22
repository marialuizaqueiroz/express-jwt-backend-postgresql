import express from "express";
import config from "./config";
import { connectDB } from "./database";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRouter from "./routes/auth.router";
import taskRoutes from "./routes/task.router"; 
import logger from "./utils/logger";

const app = express();
app.use(express.json());

app.use("/api", authRouter);
app.use("/api/tasks", taskRoutes); 

app.use(errorMiddleware);
try {
  logger.info("🔍 Tentando conectar ao MongoDB...");
  connectDB({
    serverSelectionTimeoutMS: 30000, 
    socketTimeoutMS: 45000, 
  });
  logger.info("✅ Conexão com MongoDB estabelecida!");

  app.listen(config.port, () =>
    logger.info(`🚀 Servidor rodando na porta ${config.port}`)
  );
} catch (error: any) {
  logger.error("❌ Falha ao conectar ao MongoDB:", error.message || error);
  process.exit(1); 
}