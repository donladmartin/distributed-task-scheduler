import Task from "../models/taskModel.js";
import { scheduleTask } from "../services/taskService.js";
export const addTask = async (req, res) => {
    try {
        const { name, type, time, cron } = req.body;
        const task = new Task({ name, type, time, cron, frequency: 0 });
        const savedTask = await task.save();
        scheduleTask(savedTask.toObject()); // Ensure the task object is passed
        res.status(201).send(savedTask);
    }
    catch (error) {
        console.error("Error adding task:", error);
        res.status(500).send({ error: "Failed to add task" });
    }
};
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send({ error: "Failed to fetch tasks" });
    }
};
export const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).send({ error: "Failed to delete task" });
    }
};
