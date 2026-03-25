import {
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const frequencyEnum = pgEnum("recurrence_frequency", [
  "monthly",
  "weekly",
]);

export const transactionTypeEnum = pgEnum("transaction_type", [
  "income",
  "expense",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    name: varchar("name", { length: 255 }).notNull(),
    type: transactionTypeEnum("type").notNull(),

    createdAt: timestamp("created_at").notNull().defaultNow(),
  },

  (table) => ({
    userIdIdx: index("categories_user_id_idx").on(table.userId),
  }),
);

export const recurrencePolicies = pgTable(
  "recurrence_policies",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),

    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    description: varchar("description", { length: 255 }),
    type: transactionTypeEnum("type").notNull(),
    frequency: frequencyEnum("frequency").notNull(),
    step: integer("step").notNull().default(1),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date"),

    createdAt: timestamp("created_at").notNull().defaultNow(),
  },

  (table) => ({
    userIdIdx: index("recurrence_policies_user_id_idx").on(table.userId),
    categoryIdIdx: index("recurrence_policies_category_id_idx").on(
      table.categoryId,
    ),
  }),
);

export const transactions = pgTable(
  "transactions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    recurrenceId: uuid("recurrence_id").references(
      () => recurrencePolicies.id,
      { onDelete: "set null" },
    ),

    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    description: varchar("description", { length: 255 }),
    type: transactionTypeEnum("type").notNull(),
    transactionDate: timestamp("transaction_date").notNull(),
    idempotencyKey: varchar("idempotency_key", { length: 255 }).notNull(),

    createdAt: timestamp("created_at").notNull().defaultNow(),
  },

  (table) => ({
    userDateIdx: index("transactions_user_date_idx").on(
      table.userId,
      table.transactionDate,
    ),
    recurrenceIdx: index("transactions_recurrence_idx").on(table.recurrenceId),
    uniqueIdempotency: uniqueIndex("transactions_user_idempotency_unique").on(
      table.userId,
      table.idempotencyKey,
    ),
    uniqueRecurrenceDate: uniqueIndex("transactions_recurrence_date_unique").on(
      table.recurrenceId,
      table.transactionDate,
    ),
  }),
);
