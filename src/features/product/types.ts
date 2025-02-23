import type { products } from '~/server/db/schema';

export type InsertProduct = typeof products.$inferInsert;
export type UpdateProduct = Partial<InsertProduct>;
export type Product = typeof products.$inferSelect;
