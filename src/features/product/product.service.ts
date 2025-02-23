import { db } from '~/server/db';
import type { UpdateProduct, InsertProduct } from './types';
import { products } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export class ProductService {
  create(input: InsertProduct) {
    return db.insert(products).values(input).returning();
  }

  findMany() {
    return db.select().from(products);
  }

  findById(id: string) {
    return db.select().from(products).where(eq(products.id, id));
  }

  update(id: string, input: UpdateProduct) {
    return db.update(products).set(input).where(eq(products.id, id)).returning();
  }

  delete(id: string) {
    return db.delete(products).where(eq(products.id, id)).returning();
  }
}
