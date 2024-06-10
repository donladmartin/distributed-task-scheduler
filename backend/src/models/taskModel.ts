import mongoose, { Document, Model } from "mongoose";
const { Schema } = mongoose;
export interface ITask extends Document {
  name: string;
  type: string;
  time: Date;
  cron: string;
  executed: boolean;
  frequency: number;
}

const taskSchema = new Schema<ITask>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  time: { type: Date },
  cron: { type: String },
  executed: { type: Boolean, default: false },
  frequency: { type: Number, default: 0 },
});

const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);

export default Task;
