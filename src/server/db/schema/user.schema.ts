import { relations, sql } from 'drizzle-orm';
import { index, integer, primaryKey, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { type AdapterAccount } from 'next-auth/adapters';
import { createTable, id, createdAt, updatedAt } from '~/server/db/schema/utils';

export const users = createTable('user', {
  id,
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  email_verified: timestamp('email_verified', {
    mode: 'date',
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar('image', { length: 255 }),
  createdAt,
  updatedAt,
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  'account',
  {
    userId: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar('type', { length: 255 }).$type<AdapterAccount['type']>().notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    provider_account_id: varchar('provider_account_id', {
      length: 255,
    }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.provider_account_id],
    }),
    userIdIdx: index('account_user_id_idx').on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  'session',
  {
    sessionToken: varchar('session_token', { length: 255 }).notNull().primaryKey(),
    user_id: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp('expires', {
      mode: 'date',
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index('session_user_id_idx').on(session.user_id),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.user_id], references: [users.id] }),
}));

export const verificationTokens = createTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', {
      mode: 'date',
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
