/// <reference types="cypress" />

describe('Link Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('Clicks "Create New Customer" link', () => {
    cy.contains('Skapa ny kund').click()
    cy.url().should('include', '/skapakund');
  })
})