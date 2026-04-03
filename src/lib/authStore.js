import { create } from "zustand";
import { authService } from "../services/authService";

/**
 * Global Auth Store using Zustand.
 * Handles user session, persistence via authService, and hydration.
 */
export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,

  /**
   * Initializes the store by fetching data from the service.
   */
  fetchUser: () => {
    const user = authService.getUser();
    set({ user, loading: false });
  },

  /**
   * Logs a user in with a new session.
   */
  login: (username) => {
    try {
      const user = { 
        username, 
        loginTime: Date.now() 
      };
      authService.setUser(user);
      set({ user });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Logs the current user out.
   */
  logout: () => {
    authService.clearSession();
    set({ user: null });
  }
}));

// Initialize the store immediately for CSR
if (typeof window !== "undefined") {
  useAuthStore.getState().fetchUser();

  // Listen for storage changes from other tabs to keep stores in sync
  window.addEventListener("storage", (e) => {
    if (e.key === "auth_user") {
      useAuthStore.getState().fetchUser();
    }
  });
}
