import React from "react";
import axios from "../../api";
import styles from "./TaskItem.module.css";
import { formatDate } from "../../utils/formatDate";

const TaskItem: React.FC<{ task: any; onDelete: (id: string) => void }> = ({
  task,
  onDelete,
}) => {
  const deleteTask = () => {
    axios.delete(`/tasks/${task._id}`).then(() => {
      onDelete(task._id);
    });
  };

  return (
    <li className={styles.taskItem}>
      <div className={styles.taskDetails}>
        <div className={styles.name}>{task.name}</div>
        <div className={styles.taskTime}>
          {task.type === "one-time" ? formatDate(task.time) : task.cron}
        </div>
        <div className={styles.taskFrequency}>Frequency: {task.frequency}</div>
        <div className={styles.status}>
          {task.executed ? "Task Executed" : "In Progress"}
        </div>
      </div>
      <button onClick={deleteTask} className={styles.deleteButton}>
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
