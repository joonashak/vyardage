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
