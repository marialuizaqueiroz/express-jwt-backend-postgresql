// Em src/database.ts
import { prisma } from '../lib/prisma';
//import prisma from './lib/prisma';


export const connectDB = () => {
  console.log('[INFO] Attempting PostgreSQL connection...');

  return prisma.$connect()
    .then(() => {
      console.log('[INFO] PostgreSQL connected');
    })
    .catch((error: Error) => {     
      console.error('!!!!!!!!!! FATAL POSTGRESQL CONNECTION ERROR !!!!!!!!!!!');
      console.error(error);
      return Promise.reject(error);
    });
};