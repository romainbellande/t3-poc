import { createContainer, asClass } from 'awilix';
import { ProductService } from './features/product';

export interface Cradle {
  productService: ProductService;
}

export const container = createContainer<Cradle>({
  injectionMode: 'PROXY',
  strict: true,
});

container.register({
  productService: asClass(ProductService),
});

export const core = container.cradle;
