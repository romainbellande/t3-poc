import { pgTableCreator } from 'drizzle-orm/pg-core';
import { timestamp, varchar } from 'drizzle-orm/pg-core';
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
// export const createTable = pgTableCreator((name) => `${env.NEXT_PUBLIC_PROJECT_NAME}_${name}`);
export const createTable = pgTableCreator((name) => `${name}`);

export const id = varchar('id', { length: 255 })
  .notNull()
  .primaryKey()
  .$defaultFn(() => crypto.randomUUID());

export const createdAt = timestamp('created_at', {
  withTimezone: true,
  mode: 'date',
})
  .defaultNow()
  .notNull();

export const updatedAt = timestamp('updated_at', {
  withTimezone: true,
  mode: 'date',
})
  .defaultNow()
  .notNull();
