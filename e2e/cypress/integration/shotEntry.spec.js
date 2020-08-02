// / <reference types="Cypress" />

describe('Shot Entry', () => {
  beforeEach(() => {
    cy.init();
  });

  // Happy path.
  it('User can enter a shot', () => {
    // Select equipment.
    cy.visit('/play');
    cy.cs('select-ball').click();
    cy.contains('Test Ball 1').click();
    cy.cs('select-club-Driver').click();
    cy.get('#select-club-Driver-option-0').click();

    // Close equipment selection.
    cy.cs('close-eq-selection').click();
    cy.cs('select-ball').should('not.be.visible');

    // Enter shot details.
    cy.get('#windDir').type('180');
    cy.get('#windSpeed').type('5');
    cy.get('#elevation').type('-10');
    cy.get('#clubId').click();
    cy.cs('club-option-Driver').click();
    cy.get('#spin').type('0');
    cy.get('#power').type('100');
    cy.get('#actCarry').type('310');

    cy.cs('save-shot-button').click();
    cy.contains('Shot recorded!');
  });

  it('Every field shows a validation error on bad data', () => {
    cy.visit('/play');
    cy.get('#liePct').clear();
    cy.cs('save-shot-button').click();

    cy.cs('select-equipment').should('contain', 'Not Completed');

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

    cy.cs('spin-button-100').click();
    cy.get('#spin').should('have.value', '-100');

    cy.cs('spin-button-0').click();
    cy.get('#spin').should('have.value', '0');

    cy.cs('power-button-100').click();
    cy.get('#power').should('have.value', '100');
  });
});
