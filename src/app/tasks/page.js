"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../lib/authStore";
import { useTaskStore } from "../../features/tasks/taskStore";
import { 
  TASK_PRIORITIES, 
  PRIORITY_COLORS, 
  DEFAULT_TASK_PRIORITY, 
  TASK_FILTERS 
} from "../../constants";
import { Button, TextField, IconButton, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InboxIcon from "@mui/icons-material/Inbox";
import EventIcon from "@mui/icons-material/Event";
import styles from "./tasks.module.css";

export default function TasksPage() {
  const { user, loading: authLoading } = useAuthStore();
  const router = useRouter();

  const { tasks, addTask, toggleComplete, deleteTask, loading: tasksLoading } = useTaskStore();
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState(DEFAULT_TASK_PRIORITY);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTask(input, priority);
    setInput("");
  };

  const filtered = tasks.filter((t) => {
    if (filter === "Pending") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });

  if (authLoading || !user || tasksLoading) return null;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My Tasks</h1>
          <p className={styles.subtitle}>{tasks.length} tasks · {tasks.filter(t => t.completed).length} completed</p>
        </div>
      </div>

      <form onSubmit={handleAddTask} className={styles.addForm}>
        <TextField
          size="small"
          variant="outlined"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ flexGrow: 1, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 1 }}
        />
        <div className={styles.priorityGroup}>
          {TASK_PRIORITIES.map((p) => (
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
        <Button variant="contained" type="submit" sx={{ whiteSpace: "nowrap" }}>
          + Add Task
        </Button>
      </form>

      <div className={styles.filterRow}>
        {TASK_FILTERS.map((f) => (
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

      <div className={styles.taskList}>
        {filtered.length === 0 && (
          <div className={styles.empty}>
            <InboxIcon className={styles.emptyIconSvg} />
            <p>No tasks here. Add one above!</p>
          </div>
        )}
        {filtered.map((task) => (
          <div
            key={task.id}
            className={`${styles.taskCard} ${task.completed ? styles.taskDone : ""}`}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Checkbox
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              color="primary"
            />
            <div className={styles.taskBody} style={{ flexGrow: 1, marginLeft: 8 }}>
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
                  <span className={styles.taskDate}>
                    <EventIcon className={styles.dateIcon} />
                    {task.createdAt}
                  </span>
                )}
              </div>
            </div>
            <IconButton onClick={() => deleteTask(task.id)} color="error" size="small">
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
}
