import { type Kyselify } from "drizzle-orm/kysely";
import { Pool } from "pg";
import {
  CamelCasePlugin,
  Kysely,
  PostgresDialect,
  type PostgresPool,
} from "kysely";

import { env } from "~/env";
import type * as schema from "./schema";

/**
 * Cache the database connection pool in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  pool: PostgresPool | undefined;
};

const pool =
  globalForDb.pool ?? new Pool({ connectionString: env.DATABASE_URL });

if (env.NODE_ENV !== "production") globalForDb.pool = pool;

interface Database {
  account: Kyselify<typeof schema.accounts>;
  users: Kyselify<typeof schema.users>;
  session: Kyselify<typeof schema.sessions>;
  verificationToken: Kyselify<typeof schema.verificationTokens>;
  products: Kyselify<typeof schema.products>;
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool,
  }),
  plugins: [new CamelCasePlugin()],
});
