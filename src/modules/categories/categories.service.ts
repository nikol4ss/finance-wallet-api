import { and, eq } from 'drizzle-orm';
import { FastifyInstance } from 'fastify';
import { db } from '../../db/index.js';
import { categories } from '../../db/schema';
import { CategoriesInput, CategoriesUpdateInput } from './categories.schemas';
import { Category } from './categories.type';

export const CategoriesService = (_app: FastifyInstance) => {
  return {
    async findAll(userId: string): Promise<Category[]> {
      return db.select().from(categories).where(eq(categories.userId, userId));
    },

    async findById(userId: string, id: string): Promise<Category | null> {
      const [row] = await db
        .select()
        .from(categories)
        .where(and(eq(categories.id, id), eq(categories.userId, userId)));

      return row ?? null;
    },

    async create(userId: string, data: CategoriesInput): Promise<Category> {
      const [created] = await db
        .insert(categories)
        .values({ ...data, userId })
        .returning();

      return created;
    },

    async update(
      userId: string,
      id: string,
      data: CategoriesUpdateInput,
    ): Promise<Category | null> {
      const [updated] = await db
        .update(categories)
        .set(data)
        .where(and(eq(categories.id, id), eq(categories.userId, userId)))
        .returning();

      return updated ?? null;
    },

    async delete(userId: string, id: string): Promise<boolean> {
      const result = await db
        .delete(categories)
        .where(and(eq(categories.id, id), eq(categories.userId, userId)))
        .returning();

      return result.length > 0;
    },
  };
};
