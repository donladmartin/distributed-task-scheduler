import amqp from "amqplib/callback_api.js";
import cron from "node-cron";
import Task from "../models/taskModel.js";
import { WebSocketServer } from "ws";
let channel;
// WebSocket setup
const wss = new WebSocketServer({ port: 8080, host: "0.0.0.0" });
const initializeTasks = async () => {
    const tasks = await Task.find();
    tasks.forEach((task) => (!task.executed && task.time) || !task.time
        ? scheduleTask(task.toObject())
        : "");
};
const connectRabbitMQ = (callback, retries = 5) => {
    amqp.connect(process.env.RABBITMQ_URL ?? "amqp://localhost/", (err, connection) => {
        if (err) {
            if (retries === 0) {
                console.error("Failed to connect to RabbitMQ after multiple attempts:", err);
                process.exit(1);
            }
            console.log(`Retrying connection to RabbitMQ (${retries} attempts left)`);
            setTimeout(() => connectRabbitMQ(callback, retries - 1), 5000);
        }
        else {
            initializeTasks();
            console.log("Connected to RabbitMQ");
            callback(null, connection);
        }
    });
};
connectRabbitMQ((err, connection) => {
    if (err)
        throw err;
    connection.createChannel((err, ch) => {
        if (err)
            throw err;
        channel = ch;
        channel.assertQueue("task_queue", { durable: true });
    });
});
export const scheduleTask = (task) => {
    if (task.type === "one-time") {
        setTimeout(() => {
            channel.sendToQueue("task_queue", Buffer.from(JSON.stringify(task)));
        }, new Date(task.time).getTime() - Date.now());
    }
    else {
        cron.schedule(task.cron, () => {
            channel.sendToQueue("task_queue", Buffer.from(JSON.stringify(task)));
        });
    }
};
connectRabbitMQ((err, connection) => {
    if (err)
        throw err;
    connection.createChannel((err, ch) => {
        if (err)
            throw err;
        ch.assertQueue("task_queue", { durable: true });
        ch.consume("task_queue", async (msg) => {
            if (msg !== null) {
                const task = JSON.parse(msg.content.toString());
                console.log(`Executing task: ${task._id}`);
                const existingTask = await Task.findById(task._id);
                if (!existingTask) {
                    console.log(`Task ${task._id} not found in the database. Removing from queue.`);
                    ch.ack(msg);
                    return;
                }
                let updatedTask = await Task.findByIdAndUpdate(task._id, {
                    $set: { executed: true },
                    $inc: { frequency: 1 },
                });
                wss.clients.forEach((client) => {
                    client.send(JSON.stringify({ updatedTask }));
                });
                ch.ack(msg);
            }
        });
    });
});
