// / <reference types="Cypress" />

const apiUrl = Cypress.env('API_URL') || '';

Cypress.Commands.add('createInitialUser', (username, password) => {
  cy.request({
    method: 'POST',
    url: `${apiUrl}/api/v1/initialUser`,
    body: { username, password },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: `${apiUrl}/api/v1/login`,
    body: { username, password },
  });
});

Cypress.Commands.add('seed', () => cy.request(`${apiUrl}/seed`));

Cypress.Commands.add('init', () => {
  cy.createInitialUser('admin', '1234');
  cy.login('admin', '1234');
  cy.seed();
})

/**
 * Shorthand for using "Cypress Selectors" (CS), i.e., `data-cy` attributes.
 */
Cypress.Commands.add('cs', (name) => {
  return cy.get(`[data-cy='${name}']`);
});
