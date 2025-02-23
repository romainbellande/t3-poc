import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.coerce.number(),
});

export const updateProductSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
});
