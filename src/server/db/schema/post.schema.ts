import { sql } from "drizzle-orm";
import {
  index,
  integer,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createTable } from "./utils";
import { users } from "./user.schema";


export const posts = createTable(
    "post",
    {
      id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
      name: varchar("name", { length: 256 }),
      createdById: varchar("created_by", { length: 255 })
        .notNull()
        .references(() => users.id),
      createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
      updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
        () => new Date()
      ),
    },
    (example) => ({
      createdByIdIdx: index("created_by_idx").on(example.createdById),
      nameIndex: index("name_idx").on(example.name),
    })
);