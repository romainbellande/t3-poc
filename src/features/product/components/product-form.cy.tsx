import React from 'react';
import { ProductForm } from './product-form';

describe('<ProductForm />', () => {
  const dummySubmit = () => {
    console.log('submit');
  };

  const name = 'Test Product';
  const description = 'Test Description';
  const price = 100;

  it('renders', () => {
    cy.mount(<ProductForm onSubmit={dummySubmit} />);
    cy.get('div').should((el) => expect(el).to.exist);
  });

  it('renders the name input', () => {
    cy.mount(<ProductForm onSubmit={dummySubmit} />);
    cy.get('input[name="name"]').should((el) => expect(el).to.exist);
  });

  it('renders the description input', () => {
    cy.mount(<ProductForm onSubmit={dummySubmit} />);
    cy.get('input[name="description"]').should((el) => expect(el).to.exist);
  });

  it('renders the price input', () => {
    cy.mount(<ProductForm onSubmit={dummySubmit} />);
    cy.get('input[name="price"]').should((el) => expect(el).to.exist);
  });

  it('renders the submit button', () => {
    cy.mount(<ProductForm onSubmit={dummySubmit} />);
    cy.get('button[type="submit"]').should((el) => expect(el).to.exist);
  });

  it('calls the onSubmit function when the form is submitted', () => {
    const onSubmit = cy.spy().as('onSubmit');
    cy.mount(<ProductForm onSubmit={onSubmit} />);

    cy.get('form').within(() => {
      cy.get('input[name="name"]').type(name);
      cy.get('input[name="description"]').type(description);
      cy.get('input[name="price"]').type(price.toString());
      cy.get('button[type="submit"]').click();
    });
    cy.get('@onSubmit').should((el) => expect(el).to.have.been.calledOnce);
    cy.get('@onSubmit').should((el) =>
      expect(el).to.have.been.calledWith({
        name,
        description,
        price,
      }),
    );
  });

  it('resets the form when the mutation is successful', () => {
    cy.mount(<ProductForm onSubmit={dummySubmit} isSuccess={true} />);
    cy.get('input[name="name"]').should('have.value', '');
    cy.get('input[name="description"]').should('have.value', '');
    cy.get('input[name="price"]').should('have.value', '0');
  });
});
