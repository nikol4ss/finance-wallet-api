import { z } from 'zod';
import { transactionTypeEnum } from '../../db/schema';

export const CategoriesCreateSchemas = z.object({
  id: z.string().uuid('ID inválido'),
  name: z
    .string()
    .trim()
    .min(3, 'Categoria: mínimo 3 caracteres')
    .max(255, 'Categoria: excedido o máximo de caracteres'),
  type: z.enum(transactionTypeEnum.enumValues),
});

export const CategoriesUpdateSchema = CategoriesCreateSchemas.partial();

export type CategoriesInput = z.infer<typeof CategoriesCreateSchemas>;
export type CategoriesUpdateInput = z.infer<typeof CategoriesUpdateSchema>;
