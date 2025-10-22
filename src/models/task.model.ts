import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string; // O '?' torna o campo opcional
  completed: boolean;
  user: Schema.Types.ObjectId; // Referência ao dono da tarefa
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Referencia ao modelo 'User' que você já tem
    required: true,
  }
}, {
  timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

export const TaskModel = model<ITask>('Task', taskSchema);