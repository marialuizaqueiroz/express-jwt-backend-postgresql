import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string; 
  completed: boolean;
  user: Schema.Types.ObjectId; 
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
    ref: 'User', 
    required: true,
  }
}, {
  timestamps: true 
});

export const TaskModel = model<ITask>('Task', taskSchema);