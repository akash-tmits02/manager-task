import { create } from "zustand";
import { taskService } from "../../services/taskService";

/**
 * Global Task Store using Zustand.
 * Decouples state logic from persistence via taskService.
 */
export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: true,

  /**
   * Initializes the store by fetching data from the service.
   */
  fetchTasks: () => {
    const tasks = taskService.getTasks();
    set({ tasks, loading: false });
  },

  /**
   * Adds a new task with consistent formatting and immediate persistence.
   */
  addTask: (text, priority) => {
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: new Date().toLocaleDateString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
      }),
    };
    
    set((state) => {
      const updatedTasks = [newTask, ...state.tasks];
      taskService.saveTasks(updatedTasks);
      return { tasks: updatedTasks };
    });
  },

  /**
   * Toggles task completion with immediate persistence.
   */
  toggleComplete: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.map((t) => 
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      taskService.saveTasks(updatedTasks);
      return { tasks: updatedTasks };
    });
  },

  /**
   * Deletes a task by ID.
   */
  deleteTask: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.filter((t) => t.id !== id);
      taskService.saveTasks(updatedTasks);
      return { tasks: updatedTasks };
    });
  },

  /**
   * Updates an existing task's text and priority.
   */
  updateTask: (id, text, priority) => {
    set((state) => {
      const updatedTasks = state.tasks.map((t) => 
        t.id === id ? { ...t, text: text.trim(), priority } : t
      );
      taskService.saveTasks(updatedTasks);
      return { tasks: updatedTasks };
    });
  },

  /**
   * Resets the entire task list (useful for logout/reset).
   */
  resetTasks: () => {
    taskService.clearTasks();
    set({ tasks: [], loading: false });
  }
}));

// Initialize the store immediately for CSR
if (typeof window !== "undefined") {
  useTaskStore.getState().fetchTasks();

  // Listen for storage changes from other tabs to keep stores in sync
  window.addEventListener("storage", (e) => {
    if (e.key === "tasks") {
      useTaskStore.getState().fetchTasks();
    }
  });

  // Also listen for internal events for same-tab cross-component sync
  window.addEventListener("storage-update", () => {
    useTaskStore.getState().fetchTasks();
  });
}
