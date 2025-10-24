import { User } from '@prisma/client'; 
import { prisma } from '../lib/prisma'; 


type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export const createUser = async (input: CreateUserInput) => {
  return prisma.user.create({
    data: input,
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};