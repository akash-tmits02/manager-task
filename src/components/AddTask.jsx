"use client";

import { useState } from "react";

export default function AddTask({ addTask }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    addTask(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />
      <button type="submit" style={{ marginLeft: "10px" }}>
        Add
      </button>
    </form>
  );
}
