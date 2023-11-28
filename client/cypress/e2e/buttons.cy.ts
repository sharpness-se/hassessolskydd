describe('Link Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Clicks "Create New Customer" link', () => {
    cy.contains('Skapa ny kund').click()
    cy.url().should('include', '/skapakund');
  })
})