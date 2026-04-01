import { z } from 'zod';
import { transactionTypeEnum } from '../../db/schema';

export const categoriesSchemas = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Categoria: mínimo 3 caracteres')
    .max(255, 'Categoria: excedido o máximo de caracteres'),
  type: z.enum(transactionTypeEnum.enumValues),
});

export type categoriesInput = z.infer<typeof categoriesSchemas>;
