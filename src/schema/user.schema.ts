import z from "zod";

export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  city: z.string(),
  phoneNumber: z.string(),
  password: z.string().min(8),
  confirmPassword: z.string(),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginUserInput = z.TypeOf<typeof loginUserSchema>;
