/// <reference types="Cypress" />

describe('Authentication', () => {
  it('Login page loads', () => {
    cy.visit('/')
    cy.contains('Login').click()
    cy.url().should('include', '/login')
  })
})