/// <reference types="cypress" />

export interface AuthentikLoginArgs {
  username: string;
  password: string;
}

export function authentikLogin(
  { username, password }: AuthentikLoginArgs = {
    username: Cypress.env('AUTH_USERNAME') as string,
    password: Cypress.env('AUTH_PASSWORD') as string,
  },
) {
  cy.visit(`${Cypress.env('CYPRESS_BASE_URL')}/`);

  cy.url().should('equal', `${Cypress.env('CYPRESS_BASE_URL')}/api/auth/signin`);

  cy.get('.signin button[type="submit"]').click();

  cy.origin(
    Cypress.env('AUTH_DOMAIN') as string,
    { args: { username, password } },
    ({ username, password }) => {
      cy.url().should('include', `if/flow`);
      cy.get('ak-flow-executor')
        .shadow()
        .find('ak-stage-identification')
        .shadow()
        .find('ak-form-element')
        .find('[name=uidField]')
        .type(username);

      cy.get('ak-flow-executor')
        .shadow()
        .find('ak-stage-identification')
        .shadow()
        .find('button[type=submit]')
        .click();

      cy.get('ak-flow-executor')
        .shadow()
        .find('ak-locale-context')
        .find('ak-stage-password')
        .shadow()
        .find('ak-form-element')
        .find('[name=password]')
        .type(password);

      cy.get('ak-flow-executor')
        .shadow()
        .find('ak-locale-context')
        .find('ak-stage-password')
        .shadow()
        .find('button[type=submit]')
        .click();

      cy.url().should('equal', '');
    },
  );

  // After we're back in the main application context, verify the final URL
  cy.url().should('include', Cypress.env('CYPRESS_BASE_URL'));
}
