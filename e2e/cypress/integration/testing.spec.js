/// <reference types="Cypress" />

context('Testing', () => {
  it('is just testing.', () => {
    throw new Error('fail on purpose');
    cy.visit("");
  });
});
