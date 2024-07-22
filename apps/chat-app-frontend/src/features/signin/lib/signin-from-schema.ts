import { z } from 'zod';

export const signinFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email format' }),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
