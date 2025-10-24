import { prisma } from '../lib/prisma';

type TaskCreateInput = {
  title: string;
  description?: string;
}

type TaskUpdateInput = {
  title?: string;
  description?: string;
  completed?: boolean;
}


export const createTask = async (input: TaskCreateInput, userId: string) => {
  return prisma.task.create({
    data: {
      title: input.title,
      description: input.description,
      userId: userId, 
    },
  });
};

export const findTasks = async (userId: string, query: { completed?: string }) => {
  const completed = query.completed ? query.completed === 'true' : undefined;

  return prisma.task.findMany({
    where: {
      userId: userId, 
      completed: completed, 
    },
  });
};

export const findTaskById = async (id: string, userId: string) => {
  return prisma.task.findFirst({
    where: {
      id: id,
      userId: userId, 
    },
  });
};

export const updateTask = async (id: string, userId: string, input: TaskUpdateInput) => {

  const { count } = await prisma.task.updateMany({
    where: {
      id: id,
      userId: userId, 
    },
    data: input,
  });

  if (count === 0) {
    return null;
  }

  return prisma.task.findUnique({ where: { id: id } });
};

export const deleteTask = async (id: string, userId: string) => {

  const { count } = await prisma.task.deleteMany({
    where: {
      id: id,
      userId: userId, 
    },
  });

  return count > 0; 
};