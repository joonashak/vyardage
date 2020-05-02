// / <reference types="Cypress" />

describe('Shot Entry', () => {
  beforeEach(() => {
    cy.createInitialUser('admin', '1234');
    cy.login('admin', '1234');
    cy.seed();
  });

  // Happy path.
  it('User can enter a shot', () => {
    // Select equipment.
    cy.visit('/play');
    cy.get('[data-cy="select-ball"]').click();
    cy.contains('Test Ball 1').click();
    cy.get('[data-cy="select-club-Driver"]').click();
    cy.get('#select-club-Driver-option-0').click();

    // Close equipment selection.
    cy.get('[data-cy="close-eq-selection"]').click();
    cy.get('[data-cy="select-ball"]').should('not.be.visible');

    // Enter shot details.
    cy.get('#windDir').type('180');
    cy.get('#windSpeed').type('5');
    cy.get('#elevation').type('-10');
    cy.get('#clubId').click();
    cy.get('[data-cy="club-option-Driver"]').click();
    cy.get('#spin').type('0');
    cy.get('#power').type('100');
    cy.get('#actCarry').type('310');

    cy.get('[data-cy="save-shot-button"]').click();
    cy.contains('Shot recorded!');
  });

  it('Every field shows a validation error on bad data', () => {
    cy.visit('/play');
    cy.get('#liePct').clear();
    cy.get('[data-cy="save-shot-button"]').click();

    cy.get('[data-cy="select-equipment"]').should('contain', 'Not Completed');

    cy.contains('Lie % is required.');
    cy.contains('Wind Direction is required.');
    cy.contains('Wind Speed is required.');
    cy.contains('Elevation is required.');
    cy.contains('Club Selection is required.');
    cy.contains('Spin is required.');
    cy.contains('Power is required.');
    cy.contains('Carry distance is required.');
  });

  it('Shortcut buttons are working', () => {
    cy.visit('/play');

    cy.get('[data-cy="spin-button-100"]').click();
    cy.get('#spin').should('have.value', '-100');

    cy.get('[data-cy="spin-button-0"]').click();
    cy.get('#spin').should('have.value', '0');

    cy.get('[data-cy="power-button-100"]').click();
    cy.get('#power').should('have.value', '100');
  });
});
