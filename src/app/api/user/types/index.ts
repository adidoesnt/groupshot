import { z } from "zod";

// Create user
export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  id: z.string().min(1),
  enabled: z.boolean().optional().default(false),
});

export type CreateUserRequest = z.infer<typeof createUserSchema>;

// Update user
export const updateUserSchema = z.object({
  id: z.string().min(1),
  updates: z.object({
    enabled: z.boolean().optional(),
  }),
});

export type UpdateUserRequest = z.infer<typeof updateUserSchema>;
