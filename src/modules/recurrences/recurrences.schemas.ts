import { z } from 'zod';
import { frequencyEnum, transactionTypeEnum } from '../../db/schema';

export const RecurrencesCreateSchema = z.object({
  categoryId: z.string().uuid(),
  amount: z.number().positive(),
  description: z.string().max(255).optional(),
  type: z.enum(transactionTypeEnum.enumValues),
  frequency: z.enum(frequencyEnum.enumValues),
  step: z.number().int().positive().default(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
});

export const RecurrencesUpdateSchema = RecurrencesCreateSchema.omit({
  categoryId: true,
  type: true,
}).partial();

export type RecurrencesInput = z.infer<typeof RecurrencesCreateSchema>;
export type RecurrencesUpdateInput = z.infer<typeof RecurrencesUpdateSchema>;
