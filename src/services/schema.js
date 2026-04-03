import { z } from "zod";

/**
 * Shared schemas for the application entities.
 * Used for validation during storage operations and state updates.
 */

export const UserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  loginTime: z.number().optional(),
});

export const TaskSchema = z.object({
  id: z.number(),
  text: z.string().min(1, "Task content cannot be empty"),
  completed: z.boolean().default(false),
  priority: z.enum(["Low", "Medium", "High"]).default("Medium"),
  createdAt: z.string().optional(),
});

export const TaskListSchema = z.array(TaskSchema);
