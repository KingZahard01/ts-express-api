// src/schemas/userSchema.ts
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});
