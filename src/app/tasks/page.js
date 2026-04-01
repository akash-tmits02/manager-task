"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth";
import styles from "./tasks.module.css";

const PRIORITIES = ["Low", "Medium", "High"];
const PRIORITY_COLORS = { Low: "#34d399", Medium: "#f59e0b", High: "#f87171" };

export default function TasksPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All"); // All | Pending | Completed

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(saved);
  }, []);

  const save = (updated) => {
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      priority,
      createdAt: new Date().toLocaleDateString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
      }),
    };
    save([newTask, ...tasks]);
    setInput("");
  };

  const toggleComplete = (id) => {
    save(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    save(tasks.filter((t) => t.id !== id));
  };

  const filtered = tasks.filter((t) => {
    if (filter === "Pending") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });

  if (loading || !user) return null;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My Tasks</h1>
          <p className={styles.subtitle}>{tasks.length} tasks · {tasks.filter(t => t.completed).length} completed</p>
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={addTask} className={styles.addForm}>
        <input
          type="text"
          className={styles.addInput}
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className={styles.priorityGroup}>
          {PRIORITIES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`${styles.priorityBtn} ${priority === p ? styles.priorityActive : ""}`}
              style={{ "--pcolor": PRIORITY_COLORS[p] }}
            >
              {p}
            </button>
          ))}
        </div>
        <button type="submit" className={styles.addBtn}>+ Add Task</button>
      </form>

      {/* Filter Tabs */}
      <div className={styles.filterRow}>
        {["All", "Pending", "Completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ""}`}
          >
            {f}
            <span className={styles.filterCount}>
              {f === "All" ? tasks.length : f === "Pending" ? tasks.filter(t => !t.completed).length : tasks.filter(t => t.completed).length}
            </span>
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className={styles.taskList}>
        {filtered.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>📭</span>
            <p>No tasks here. Add one above!</p>
          </div>
        )}
        {filtered.map((task) => (
          <div
            key={task.id}
            className={`${styles.taskCard} ${task.completed ? styles.taskDone : ""}`}
          >
            <button
              className={`${styles.checkbox} ${task.completed ? styles.checkboxDone : ""}`}
              onClick={() => toggleComplete(task.id)}
              aria-label="Toggle complete"
            >
              {task.completed ? "✓" : ""}
            </button>
            <div className={styles.taskBody}>
              <p className={styles.taskText}>{task.text}</p>
              <div className={styles.taskMeta}>
                {task.priority && (
                  <span
                    className={styles.priorityBadge}
                    style={{ "--pcolor": PRIORITY_COLORS[task.priority] }}
                  >
                    {task.priority}
                  </span>
                )}
                {task.createdAt && (
                  <span className={styles.taskDate}>📅 {task.createdAt}</span>
                )}
              </div>
            </div>
            <button
              className={styles.deleteBtn}
              onClick={() => deleteTask(task.id)}
              aria-label="Delete task"
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
