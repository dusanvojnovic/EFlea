import z from "zod";

export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  city: z.string(),
  phoneNumber: z.string().nullish(),
  password: z.string().min(8),
  confirmPassword: z.string(),
});

export const editUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  phoneNumber: z.string().nullish(),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type CreateUserType = z.TypeOf<typeof createUserSchema>;
export type EditUserType = z.TypeOf<typeof editUserSchema>;
export type LoginUserType = z.TypeOf<typeof loginUserSchema>;
