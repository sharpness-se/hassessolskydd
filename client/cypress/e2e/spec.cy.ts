describe('Visit localhost', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})