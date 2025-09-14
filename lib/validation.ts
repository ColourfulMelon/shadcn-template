import { z } from 'zod';

export const zPassword = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(128, { message: 'Password must be at most 128 characters long' });
