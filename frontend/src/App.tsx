import React, { useState, useEffect } from "react";
import axios from "./api";
import AddTask from "./components/AddTask/AddTask";
import TaskList from "./components/TaskList/TaskList";
import "./App.css";

interface Task {
  _id: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("Task");

  useEffect(() => {
    fetchTasks();

    const socket = new WebSocket(
      process.env.REACT_APP_WEBSOCKET_URL ?? "ws://localhost:8080"
    );
    socket.onopen = () => console.log("WebSocket connected");
    socket.onmessage = (event) => {
      const updatedTask: any = JSON.parse(event.data);
      fetchTasks();
      console.log(updatedTask);
      setNotificationText(updatedTask?.updatedTask?.name);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    };

    return () => {
      socket.close();
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div>
      <h1 className="title">Task Scheduler </h1>
      <AddTask onTaskAdded={fetchTasks} />
      <h2>Scheduled Tasks</h2>
      <div className={`notification ${showNotification ? "show" : ""}`}>
        {notificationText} Updated!
      </div>
      <TaskList
        tasks={tasks}
        onDelete={(id: string) =>
          setTasks(tasks.filter((task) => task._id !== id))
        }
      />
    </div>
  );
};

export default App;
