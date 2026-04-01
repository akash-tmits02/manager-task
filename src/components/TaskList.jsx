"use client";

export default function TaskList({ tasks, deleteTask, toggleComplete }) {
  if (tasks.length === 0) {
    return <p>No tasks added yet.</p>;
  }

  return (
    <ul style={{ marginTop: "20px" }}>
      {tasks.map((task) => (
        <li key={task.id} style={{ marginBottom: "10px" }}>
          <span
            onClick={() => toggleComplete(task.id)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            {task.text}
          </span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}