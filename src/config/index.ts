import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/auth_mvp',
  jwtSecret: process.env.JWT_SECRET || 'dev_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h'
};
