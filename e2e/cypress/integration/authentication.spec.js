// / <reference types="Cypress" />

const login = (username, password) => {
  cy.visit('/login');
  cy.get('input[name=username]').type(username);
  cy.get('input[name=password]').type(password);
  cy.contains('Log In').click();
};

describe('Authentication', () => {
  const username = 'admin';
  const password = '1234';

  before(() => {
    cy.createInitialUser(username, password);
  });

  it('Login page loads', () => {
    cy.visit('/');
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  });

  it('User can log in', () => {
    login(username, password);

    cy.url().should('equal', `${Cypress.config().baseUrl}/`);
    cy.getCookie('connect.sid').should('exist');
    cy.get('body').should('not.contain', 'Login');
  });

  it('User can log out', () => {
    login(username, password);

    cy.get('button[aria-label="Open Menu"]').click();
    cy.contains('Log Out').click();

    cy.url().should('equal', `${Cypress.config().baseUrl}/`);
    cy.contains('Login');
  });

  it('Incorrect username is rejected', () => {
    login('asd', password);
    cy.contains('Login failed');
  });

  it('Incorrect password is rejected', () => {
    login(username, 'asd');
    cy.contains('Login failed');
  });
});
