import { z } from 'zod';

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email format' }),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type SigninPayload = z.infer<typeof signinSchema>;
