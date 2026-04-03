import { UserSchema } from "./schema";

const STORAGE_KEY = "auth_user";

/**
 * Service Layer for Auth operations.
 * Handles persistence, retrieval, and validation.
 */
export const authService = {
  /**
   * Fetches the current logged-in user with Zod validation.
   */
  getUser: () => {
    if (typeof window === "undefined") return null;
    
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;
      
      const parsed = JSON.parse(data);
      const result = UserSchema.safeParse(parsed);
      
      if (!result.success) {
        console.warn("Auth user validation failed, clearing storage.");
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      
      return result.data;
    } catch (error) {
      console.error("Error reading auth session:", error);
      return null;
    }
  },

  /**
   * Sets the current user to localStorage with validation.
   */
  setUser: (user) => {
    if (typeof window === "undefined") return;

    try {
      if (!user) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      
      const result = UserSchema.safeParse(user);
      if (result.success) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
      } else {
        throw new Error("Invalid user data provided");
      }
    } catch (error) {
      console.error("Error saving auth session:", error);
    }
  },

  /**
   * Clear auth session.
   */
  clearSession: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
};
