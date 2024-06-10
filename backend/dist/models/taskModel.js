import mongoose from "mongoose";
const { Schema } = mongoose;
const taskSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    time: { type: Date },
    cron: { type: String },
    executed: { type: Boolean, default: false },
    frequency: { type: Number, default: 0 },
});
const Task = mongoose.model("Task", taskSchema);
export default Task;
