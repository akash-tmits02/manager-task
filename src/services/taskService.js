import { TaskListSchema, TaskSchema } from "./schema";

const STORAGE_KEY = "tasks";

/**
 * Service Layer for Task operations.
 * Handles persistence, retrieval, and validation.
 */
export const taskService = {
  /**
   * Fetches the current list of tasks from localStorage with validation.
   * If parsing or validation fails, it safely recovers to an empty array.
   */
  getTasks: () => {
    if (typeof window === "undefined") return [];
    
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      
      const parsed = JSON.parse(data);
      const result = TaskListSchema.safeParse(parsed);
      
      if (!result.success) {
        console.error("Task list validation failed:", result.error.format());
        return [];
      }
      
      return result.data;
    } catch (error) {
      console.error("Error reading tasks from storage:", error);
      return [];
    }
  },

  /**
   * Saves the list of tasks to localStorage with validation.
   */
  saveTasks: (tasks) => {
    if (typeof window === "undefined") return;

    try {
      const result = TaskListSchema.safeParse(tasks);
      if (result.success) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
        
        // Notify other listeners for cross-tab sync
        window.dispatchEvent(new Event("storage-update"));
      } else {
        throw new Error("Invalid task list data provided");
      }
    } catch (error) {
      console.error("Error saving tasks to storage:", error);
    }
  },

  /**
   * Helper to cleanup storage if corrupted.
   */
  clearTasks: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
};
