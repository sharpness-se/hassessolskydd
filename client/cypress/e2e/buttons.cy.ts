/// <reference types="cypress" />

describe('Link Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Clicks "Create New Customer" link', () => {
    cy.contains('Skapa ny kund').click()
    cy.url().should('include', '/skapakund');
  })

  it('Clicks "Create Order" link', () => {
    cy.contains('Skapa order').click()
    cy.url().should('include', '/skapaorder');
  })

  it('Clicks "See Orders" link', () => {
    cy.contains('Se ordrar').click()
    cy.url().should('include', '/seordrar');
  })
})