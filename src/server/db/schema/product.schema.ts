import { relations } from 'drizzle-orm';
import { integer, text, varchar } from 'drizzle-orm/pg-core';
import { users } from '~/server/db/schema';
import { createTable, id, createdAt, updatedAt } from '~/server/db/schema/utils';

export const products = createTable('product', {
  id,
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  authorId: varchar('authorId', { length: 255 })
    .notNull()
    .references(() => users.id),
  createdAt,
  updatedAt,
});

export const productsRelations = relations(products, ({ one }) => ({
  author: one(users, {
    fields: [products.authorId],
    references: [users.id],
  }),
}));
