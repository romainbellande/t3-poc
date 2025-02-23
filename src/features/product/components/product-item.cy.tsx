import React from 'react';
import { ProductItem } from './product-item';
import type { Product } from '../types';

const product: Product = {
  id: '1',
  name: 'Product 1',
  description: 'Description 1',
  price: 100,
  authorId: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('<ProductItem />', () => {
  it('renders', () => {
    cy.mount(<ProductItem product={product} />);
    cy.get('div').should('exist');
  });

  it('renders the product name', () => {
    cy.mount(<ProductItem product={product} />);
    cy.get('div').should('contain', product.name);
  });

  it('renders the product description', () => {
    cy.mount(<ProductItem product={product} />);
    cy.get('div').should('contain', product.description);
  });

  it('renders the product price', () => {
    cy.mount(<ProductItem product={product} />);
    cy.get('div').should('contain', product.price);
  });

  it('renders the product author', () => {
    cy.mount(<ProductItem product={product} />);
    cy.get('div').should('contain', product.authorId);
  });
});
