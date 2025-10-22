import { TaskModel, ITask } from '../models/task.model';
import { FilterQuery } from 'mongoose';

// Criar uma nova tarefa
export const createTask = async (input: Partial<ITask>, userId: string): Promise<ITask> => {
  const taskData = { ...input, user: userId };
  const task = await TaskModel.create(taskData);
  return task;
};

// Listar/Filtrar tarefas DE UM USUÁRIO
export const findTasks = async (userId: string, query: FilterQuery<ITask>): Promise<ITask[]> => {
  const tasks = await TaskModel.find({ user: userId, ...query });
  return tasks;
};

// Buscar uma tarefa específica DE UM USUÁRIO
export const findTaskById = async (taskId: string, userId: string): Promise<ITask | null> => {
  const task = await TaskModel.findOne({ _id: taskId, user: userId });
  return task;
};

// Atualizar uma tarefa DE UM USUÁRIO
export const updateTask = async (taskId: string, userId: string, update: Partial<ITask>, overwrite = false): Promise<ITask | null> => {
  // CORREÇÃO: Adicionamos 'includeResultMetadata: false'
  const options = { new: true, overwrite, includeResultMetadata: false };
  
  const task = await TaskModel.findOneAndUpdate(
    { _id: taskId, user: userId },
    update,
    options
  );
  return task;
};

// Deletar uma tarefa DE UM USUÁRIO
export const deleteTask = async (taskId: string, userId: string): Promise<ITask | null> => {
  const task = await TaskModel.findOneAndDelete(
    { _id: taskId, user: userId },
    { includeResultMetadata: false }
  );
  return task;
};