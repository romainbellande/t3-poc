import { db } from '~/server/db';
import type { UpdateProduct, InsertProduct } from './types';

export class ProductService {
  create(input: InsertProduct) {
    return db.insertInto('products').values(input).executeTakeFirst();
  }

  findMany() {
    return db.selectFrom('products').selectAll().execute();
  }

  findById(id: string) {
    return db.selectFrom('products').selectAll().where('id', '=', id).executeTakeFirst();
  }

  update(id: string, input: UpdateProduct) {
    return db.updateTable('products').set(input).where('id', '=', id).executeTakeFirst();
  }

  delete(id: string) {
    return db.deleteFrom('products').where('id', '=', id).executeTakeFirst();
  }
}
