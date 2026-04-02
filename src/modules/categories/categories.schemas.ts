import { z } from 'zod';
import { transactionTypeEnum } from '../../db/schema';

export const CategoriesSchemas = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Categoria: mínimo 3 caracteres')
    .max(255, 'Categoria: excedido o máximo de caracteres'),
  type: z.enum(transactionTypeEnum.enumValues),
});

export const CategoriesUpdateSchema = CategoriesSchemas.partial();

export type CategoriesInput = z.infer<typeof CategoriesSchemas>;
export type CategoriesUpdateInput = z.infer<typeof CategoriesUpdateSchema>;
