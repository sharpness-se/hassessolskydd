/// <reference types="cypress" />

describe('See all orders tests', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/seordrar");
  });

  it('Checks that table is populated', () => {
    cy.get('table').should('exist'); // Check if the table element exists
    cy.get('table tbody tr').should('have.length.gt', 0); // Check if there are rows in the table body
  })


})