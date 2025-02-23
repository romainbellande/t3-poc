import { createContainer, asClass, InjectionMode } from 'awilix';
import type { ProductService } from './features/product';

export interface Cradle {
  productService: ProductService;
}

export const container = createContainer<Cradle>({
  injectionMode: 'PROXY',
  strict: true,
});

container.loadModules(['features/**/*.service.ts'], {
  resolverOptions: {
    injectionMode: InjectionMode.PROXY,
    lifetime: 'SINGLETON',
    register: asClass,
  },
});
