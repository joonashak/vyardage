// / <reference types="Cypress" />

describe('Settings', () => {
  beforeEach(() => {
    cy.init();
    cy.visit('/settings');
  });

  it('Add new ball', () => {
    cy.cs('balls').click();
    cy.cs('add-ball-button').click();
    cy.cs('input-name').click().type('Cypress ball');
    cy.cs('input-distance').click().type('3.6');
    cy.cs('input-spin').click().type('2.1');
    cy.cs('submit').click();

    cy.contains('Ball added!');
    cy.cs('Cypress ball').click();
    cy.contains('3.6');
    cy.contains('2.1');
  });

  it('Edit a ball', () => {
    cy.cs('balls').click();
    cy.cs('Test Ball 1').click();
    cy.cs('edit-Test Ball 1').click();
    cy.get('input[name=name]').clear().type('Cypress ball');
    cy.get('input[name=distance]').clear().type('3.6');
    cy.get('input[name=spin]').clear().type('2.1');
    cy.cs('submit').click();

    cy.contains('Ball updated!');
    cy.cs('Cypress ball').click();
    cy.contains('3.6');
    cy.contains('2.1');
  });

  it('Delete a ball', () => {
    cy.cs('balls').click();
    cy.cs('Test Ball 1').click();
    cy.cs('delete-Test Ball 1').click();
    cy.contains('Test Ball 1').should('not.exist');
  });
});
