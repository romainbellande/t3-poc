import { createContainer, asClass } from 'awilix';
import { ProductService } from './features/product';

export interface Cradle {
  productService: ProductService;
}

export const container = createContainer<Cradle>({
  injectionMode: 'CLASSIC',
  strict: true,
});

// container.loadModules(['features/**/*.service.ts'], {
//   resolverOptions: {
//     injectionMode: InjectionMode.PROXY,
//     lifetime: 'SINGLETON',
//     register: asClass,
//   },
// });

container.register({
  productService: asClass(ProductService),
});
