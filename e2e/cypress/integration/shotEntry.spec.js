// / <reference types="Cypress" />

describe('Shot Entry', () => {
  before(() => {
    cy.createInitialUser('admin', '1234');
    cy.login('admin', '1234');
    cy.seed();
  });

  it('User can enter a shot', () => {
    // Select equipment.
    cy.visit('/play');
    cy.get('[data-cy="select-ball"]').click();
    cy.contains('Test Ball 1').click();

    // Enter shot details.
    cy.get('#windDir').type('180');
    cy.get('#windSpeed').type('5');
    cy.get('#elevation').type('-10');
    cy.get('#clubId').click();
    cy.contains('Driver').click();
    cy.get('#spin').type('0');
    cy.get('#power').type('100');
    cy.get('#actCarry').type('310');

    cy.contains('Save Shot').click();
    cy.contains('Shot recorded!');
  });
});
