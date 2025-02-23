'use client';

import { api } from '~/trpc/react';
import type { Product } from '../types';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

export function ProductListContainer() {
  const [products] = api.product.findMany.useSuspenseQuery();

  return <ProductList products={products} />;
}
