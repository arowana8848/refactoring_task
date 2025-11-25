import { z } from "zod";

// Create DTO + schema
export const CreateUserSchema = z.object({
  id: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(1),
  age: z.number().int().min(0).optional().nullable(),
});
export type CreateUserDto = z.infer<typeof CreateUserSchema>;

// Update DTO (partial allowed)
export const UpdateUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(1),
  age: z.number().int().min(0).optional().nullable(),
});
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;