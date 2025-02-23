import React from 'react';
import { ProductList } from './product-list';
import type { Product } from '../types';

describe('<ProductList />', () => {
  it('renders', () => {
    const products: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
        authorId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        price: 200,
        authorId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    cy.mount(<ProductList products={products} />);
    cy.get('div').should('exist');
    cy.get('div').should('contain', products[0]!.name);
    cy.get('div').should('contain', products[1]!.name);
  });
});
