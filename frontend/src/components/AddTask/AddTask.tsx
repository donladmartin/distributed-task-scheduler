import React, { useState } from "react";
import axios from "../../api";
import styles from "./AddTask.module.css";

const AddTask: React.FC<{ onTaskAdded: () => void }> = ({ onTaskAdded }) => {
  const [type, setType] = useState("one-time");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [cron, setCron] = useState("");
  const [error, setError] = useState("");

  const addTask = () => {
    if (validateInput()) {
      axios.post("/tasks", { name, type, time, cron }).then(() => {
        onTaskAdded();
        setType("one-time");
        setName("");
        setTime("");
        setCron("");
        setError("");
      });
    }
  };

  const validateInput = () => {
    if (!name || name.trim() === "") {
      setError("Task name is required");
      return false;
    }

    if (type === "one-time" && (!time || time.trim() === "")) {
      setError("Task time is required for one-time tasks");
      return false;
    }

    if (type === "recurring" && (!cron || cron.trim() === "")) {
      setError("Cron syntax is required for recurring tasks");
      return false;
    }

    setError("");
    return true;
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
        className={styles.input}
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className={styles.select}
      >
        <option value="one-time">One-Time</option>
        <option value="recurring">Recurring</option>
      </select>
      {type === "one-time" ? (
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className={styles.input}
        />
      ) : (
        <input
          type="text"
          placeholder="Cron syntax"
          value={cron}
          onChange={(e) => setCron(e.target.value)}
          className={styles.inputCron}
        />
      )}
      {error && <p className={styles.error}>{error}</p>}
      <button onClick={addTask} className={styles.button}>
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
