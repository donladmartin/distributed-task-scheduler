import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";

const TaskList: React.FC<{ tasks: any[]; onDelete: (id: string) => void }> = ({
  tasks,
  onDelete,
}) => {
  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <li key={task._id} className={styles.taskListItem}>
          <TaskItem task={task} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
