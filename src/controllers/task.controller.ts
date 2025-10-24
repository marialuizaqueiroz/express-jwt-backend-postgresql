import { Request, Response } from 'express';
import * as taskService from '../services/task.service';
import logger from '../utils/logger';

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user.sub as string;
    
    // --- MELHORIA: ADICIONAR VALIDAÇÃO ---
    const { title } = req.body;
    if (!title) {
      return res.status(422).json({ message: "O campo 'title' é obrigatório" });
    }
    // --- FIM DA MELHORIA ---

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    const task = await taskService.createTask(req.body, userId);
    
    return res.status(201).json(task);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).json({ message: error.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.user.sub as string;
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const query = req.query as { completed?: string };

    const tasks = await taskService.findTasks(userId, query);
    return res.status(200).json(tasks);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(500).json({ message: 'Erro ao buscar tarefas' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const userId = req.user.sub as string;
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const task = await taskService.findTaskById(req.params.id, userId);

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    return res.status(200).json(task);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(500).json({ message: 'Erro ao buscar tarefa' });
  }
};

export const updateTaskById = async (req: Request, res: Response) => {
  try {
    const userId = req.user.sub as string;
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const task = await taskService.updateTask(req.params.id, userId, req.body);

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    return res.status(200).json(task);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).json({ message: error.message });
  }
};

export const deleteTaskById = async (req: Request, res: Response) => {
  try {
    const userId = req.user.sub as string;
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const success = await taskService.deleteTask(req.params.id, userId);

    if (!success) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    return res.status(204).send(); 
  } catch (error: any) {
    logger.error(error.message);
    return res.status(500).json({ message: 'Erro ao deletar tarefa' });
  }
};